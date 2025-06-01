<?php

namespace App\Http\Controllers\Customer;

use Carbon\Carbon;
use App\Models\Room;
use App\Models\Hotel;
use App\Models\Policy;
use App\Models\Reservation;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\ReservationHelper;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CheckAvaibilityRequest;
use App\Http\Requests\Customer\StoreReservationRequest;
use App\Services\GetMidtransSnapTokenService;
use App\Services\MidtransService;
use App\Services\ReservationService;
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

        return inertia("customers/reservation", [
            "hotel" => $hotel,
            "policies" => $this->policies,
        ]);
    }

    public function checkAvailability(CheckAvaibilityRequest $request, Hotel $hotel)
    {
        $hasCheckAvailability = false;

        try {
            if ($hotel = $this->availableRooms($hotel, $request->check_in, $request->check_out, $request->allotment)) {
                session()->put('reservation', [
                    'hotel' => $hotel,
                    'check_in' => $this->dateParser($request->check_in),
                    'check_out' => $this->dateParser($request->check_out),
                    'allotment' => $request->allotment,
                ]);

                $hasCheckAvailability = true;
            } else {
                $hasCheckAvailability = false;
            }
        } catch (\Throwable $th) {
            $hasCheckAvailability = false;
            logger()->error('Error checking availability: ' . $th->getMessage());
        }

        return inertia("customers/reservation", [
            "hotel" => $hotel,
            "hasCheckAvailability" => $hasCheckAvailability,
            "totalNights" => $this->calculateTotalNights($request->check_in, $request->check_out),
            "policies" => $this->policies,
        ]);
    }

    public function detail(Hotel $hotel, Room $room, Request $request)
    {
        $reservation = session()->get('reservation');
        if (blank($this->availableRoom($room, $reservation['check_in'], $reservation['check_out']))) {
            return to_route('customer.reservation.index', $hotel->uuid)->with('alert', [
                'message' => 'Room not available please try again',
                'type' => 'error',
            ]);
        }

        if (blank($reservation)) {
            return to_route('customer.reservation.index', $hotel->uuid)->with('alert', [
                'message' => 'Reservation not found please try again',
                'type' => 'error',
            ]);
        }

        if ($reservation && $request->method() == 'POST') {
            $reservation['room'] = $room;
            $reservation['check_in'] = $reservation['check_in']->format('d F Y');
            $reservation['check_out'] = $reservation['check_out']->format('d F Y');
            $reservation['allotment'] = $reservation['allotment'];
            $reservation['total_nights'] = $this->calculateTotalNights($reservation['check_in'], $reservation['check_out']);

            session()->put('reservation', $reservation);
        }

        return inertia("customers/reservation-detail", [
            "reservation" => $reservation,
            "policies" => $this->policies,
        ]);
    }

    public function confirm(Hotel $hotel, Request $request)
    {
        $reservation = session()->get('reservation');
        if ($request->method() == 'POST') {
            $reservation['hotel'] = $hotel;
            $reservation['selectedBeds'] = $request->selectedBeds;
            $reservation['needExtraBeds'] = $request->needExtraBeds;
            $reservation['totalExtraBed'] = $request->totalExtraBed;
            $reservation['extraBedPrices'] = $request->extraBedPrices;
            $reservation['guests'] = $request->guests;
            $reservation['totalPrice'] = $request->totalPrice;

            session()->put('reservation', $reservation);
        }

        $countries = Countries::getList('en');

        return inertia("customers/reservation-confirm", [
            "reservation" => $reservation,
            "policies" => $this->policies,
            "countries" => $countries,
        ]);
    }

    public function storeReservation(StoreReservationRequest $request, ReservationService $reservationService, MidtransService $midtransService)
    {
        $reservationData = $request->reservation;

        if (!$reservationService->validateReservationData($reservationData)) {
            return back()->with('alert', [
                'message' => 'Invalid reservation data. Please try again.',
                'type' => 'error',
            ]);
        }

        DB::beginTransaction();
        try {
            $reservation = $reservationService->createReservation($reservationData);
            $reservationService->createReservationCustomer($reservation, $request);
            $reservationService->createReservationRooms($reservation, $reservationData);
            $reservationService->createReservationTransaction($reservation, $request);

            DB::commit();
            // session()->forget('reservation');
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error storing reservation: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to create reservation: ' . $th->getMessage(),
                'type' => 'error',
            ]);
        }

        $midtransResponse = $midtransService->getSnapToken(
            transactionDetails: $this->makeTransactionDetails($reservation),
            customerDetails: $this->makeCustomerDetails($reservation),
            items: $this->makeItems($reservation),
            finishUrl: 'https://google.com',
        );

        dd($midtransResponse);
    }

    protected function makeTransactionDetails(Reservation $reservation): array
    {
        return [
            'order_id' => $reservation->reservation_number,
            'gross_amount' => $reservation->transaction->pay_now,
        ];
    }

    protected function makeCustomerDetails(Reservation $reservation): array
    {
        return [
            'first_name' => $reservation->reservationCustomer->first_name,
            'last_name' => $reservation->reservationCustomer->last_name,
            'email' => $reservation->reservationCustomer->email,
            'phone' => $reservation->reservationCustomer->phone,
            'billing_address' => [
                'first_name' => $reservation->reservationCustomer->first_name,
                'last_name' => $reservation->reservationCustomer->last_name,
                'email' => $reservation->reservationCustomer->email,
                'phone' => $reservation->reservationCustomer->phone,
                'address' => $reservation->reservationCustomer->address,
                'city' => $reservation->reservationCustomer->city,
                'postal_code' => $reservation->reservationCustomer->postal_code,
                // 'country_code' => $reservation->reservationCustomer->country_code,
            ],
        ];
    }

    protected function makeItems(Reservation $reservation): array
    {
        $items = [];

        $items[] = [
            'id' => 'tax-' . $reservation->reservation_number,
            'price' => $reservation->transaction->tax_amount,
            'quantity' => 1,
            'name' => 'Tax (' . $reservation->hotel->setting->tax_percentage . '%)',
        ];

        if ($reservation->transaction->discount_amount > 0) {
            $items[] = [
                'id' => 'discount-' . $reservation->reservation_number,
                'price' => -$reservation->transaction->discount,
                'quantity' => 1,
                'name' => 'Discount (' . $reservation->transaction->promotion_code . ')',
            ];
        }

        foreach ($reservation->reservationRooms as $reservationRoom) {
            $items[] = [
                'id' => 'resRoom-' . $reservationRoom->room->id,
                'price' => $reservationRoom->room->price * $reservation->total_nights,
                'quantity' => 1,
                'name' => $reservationRoom->room->name . ' (' . $reservation->total_nights . ' night(s))',
            ];
        }

        return $items;
    }
}
