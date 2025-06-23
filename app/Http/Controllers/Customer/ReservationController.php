<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CheckAvaibilityRequest;
use App\Http\Requests\Customer\StoreReservationRequest;
use App\Models\Hotel;
use App\Models\Policy;
use App\Models\Reservation;
use App\Models\Room;
use App\Services\MidtransService;
use App\Services\ReservationService;
use App\Traits\ReservationHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Monarobase\CountryList\CountryListFacade as Countries;

class ReservationController extends Controller
{
    use ReservationHelper;

    protected $policies;

    public function __construct()
    {
        $this->policies = Policy::all();
    }

    public function index(Hotel $hotel)
    {
        $hotel->load(['rooms', 'rooms.photos', 'rooms.allotments']);

        return inertia('customers/reservation', [
            'hotel'    => $hotel,
            'policies' => $this->policies,
        ]);
    }

    public function checkAvailability(CheckAvaibilityRequest $request, Hotel $hotel)
    {
        $hasCheckAvailability = false;

        try {
            if ($hotel = $this->availableRooms($hotel, $request->check_in, $request->check_out, $request->allotment)) {
                session()->put('reservation', [
                    'hotel'     => $hotel,
                    'check_in'  => $this->dateParser($request->check_in),
                    'check_out' => $this->dateParser($request->check_out),
                    'allotment' => $request->allotment,
                ]);

                $hasCheckAvailability = true;
            } else {
                $hasCheckAvailability = false;
            }
        } catch (\Throwable $th) {
            $hasCheckAvailability = false;
            logger()->error('Error checking availability: '.$th->getMessage());
        }

        return inertia('customers/reservation', [
            'hotel'                => $hotel,
            'hasCheckAvailability' => $hasCheckAvailability,
            'totalNights'          => $this->calculateTotalNights($request->check_in, $request->check_out),
            'policies'             => $this->policies,
        ]);
    }

    public function detail(Hotel $hotel, Room $room, Request $request)
    {
        $reservation = session()->get('reservation');
        if (blank($this->availableRoom($room, $reservation['check_in'], $reservation['check_out']))) {
            return to_route('customer.reservation.index', $hotel->uuid)->with('alert', [
                'message' => 'Room not available please try again',
                'type'    => 'error',
            ]);
        }

        if (blank($reservation)) {
            return to_route('customer.reservation.index', $hotel->uuid)->with('alert', [
                'message' => 'Reservation not found please try again',
                'type'    => 'error',
            ]);
        }

        if ($reservation && $request->method() == 'POST') {
            $reservation['room']         = $room;
            $reservation['check_in']     = $reservation['check_in']->format('d F Y');
            $reservation['check_out']    = $reservation['check_out']->format('d F Y');
            $reservation['allotment']    = $reservation['allotment'];
            $reservation['total_nights'] = $this->calculateTotalNights($reservation['check_in'], $reservation['check_out']);

            session()->put('reservation', $reservation);
        }

        return inertia('customers/reservation-detail', [
            'reservation' => $reservation,
            'policies'    => $this->policies,
        ]);
    }

    public function confirm(Hotel $hotel, Request $request)
    {
        session()->put('hotel', $hotel);
        $reservation = session()->get('reservation');
        if ($request->method() == 'POST') {
            $reservation['hotel']          = $hotel;
            $reservation['selectedBeds']   = $request->selectedBeds;
            $reservation['needExtraBeds']  = $request->needExtraBeds;
            $reservation['totalExtraBed']  = $request->totalExtraBed;
            $reservation['extraBedPrices'] = $request->extraBedPrices;
            $reservation['guests']         = $request->guests;
            $reservation['totalPrice']     = $request->totalPrice;

            session()->put('reservation', $reservation);
        }

        $countries = Countries::getList('en');

        return inertia('customers/reservation-confirm', [
            'reservation' => $reservation,
            'policies'    => $this->policies,
            'countries'   => $countries,
        ]);
    }

    public function finish(Request $request)
    {
        try {
            session()->forget('reservation');
            $reservation = Reservation::where('reservation_number', $request->get('order_id', null))
                ->with(['hotel', 'reservationCustomer', 'transaction'])
                ->firstOrFail();
        } catch (\Throwable $th) {
            logger()->error('Error finishing reservation: '.$th->getMessage());

            return to_route('customer.reservation.index', $reservation->hotel->uuid)->with('alert', [
                'message' => 'Reservation not found please try again',
                'type'    => 'error',
            ]);
        }

        return inertia('customers/reservation-finish', [
            'reservation' => $reservation,
        ]);
    }

    public function storeReservation(StoreReservationRequest $request, ReservationService $reservationService, MidtransService $midtransService)
    {
        $reservationData = $request->reservation;

        if (! $reservationService->validateReservationData($reservationData)) {
            return back()->with('alert', [
                'message' => 'Invalid reservation data. Please try again.',
                'type'    => 'error',
            ]);
        }

        DB::beginTransaction();
        try {
            $reservation = $reservationService->createReservation($reservationData);
            $reservationService->createReservationCustomer($reservation, $request);
            $reservationService->createReservationRooms($reservation, $reservationData);
            $reservationService->createReservationTransaction($reservation, $request);

            $midtransResponse = $midtransService->getSnapToken(
                serverKey: $reservation?->hotel?->setting?->midtrans_server_key,
                transactionDetails: $this->makeTransactionDetails($reservation),
                customerDetails: $this->makeCustomerDetails($reservation),
                items: $this->makeItems($reservation),
                finishUrl: route('customer.reservation.finish', $reservation->hotel->uuid),
            );

            $reservation->transaction->update([
                'redirect_url' => $midtransResponse->redirect_url,
            ]);

            DB::commit();
            // session()->forget('reservation');
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error storing reservation: '.$th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to create reservation: '.$th->getMessage(),
                'type'    => 'error',
            ]);
        }

        return back()->with('snap_token', $midtransResponse->token);
    }

    protected function makeTransactionDetails(Reservation $reservation): array
    {
        return [
            'order_id'     => $reservation->reservation_number,
            'gross_amount' => $reservation->transaction->pay_now,
        ];
    }

    protected function makeCustomerDetails(Reservation $reservation): array
    {
        return [
            'first_name'      => $reservation->reservationCustomer->first_name,
            'last_name'       => $reservation->reservationCustomer->last_name,
            'email'           => $reservation->reservationCustomer->email,
            'phone'           => $reservation->reservationCustomer->phone,
            'billing_address' => [
                'first_name'  => $reservation->reservationCustomer->first_name,
                'last_name'   => $reservation->reservationCustomer->last_name,
                'email'       => $reservation->reservationCustomer->email,
                'phone'       => $reservation->reservationCustomer->phone,
                'address'     => $reservation->reservationCustomer->address,
                'city'        => $reservation->reservationCustomer->city,
                'postal_code' => $reservation->reservationCustomer->postal_code,
            ],
        ];
    }

    protected function makeItems(Reservation $reservation): array
    {
        return [
            [
                'id'       => 'payment-'.$reservation->reservation_number,
                'price'    => $reservation->transaction->pay_now,
                'quantity' => 1,
                'name'     => 'Payment '.$reservation->hotel->setting->dp_percentage.'%',
            ],
        ];
    }
}
