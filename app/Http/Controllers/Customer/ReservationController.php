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

    public function storeReservation(StoreReservationRequest $request)
    {
        $reservationData = $request->reservation;

        if (!$reservationData || !isset($reservationData['hotel']) || !isset($reservationData['hotel']['id'])) {
            return back()->with('alert', [
                'message' => 'Invalid reservation data. Please try again.',
                'type' => 'error',
            ]);
        }

        $customer = $request->safe()->only([
            'first_name',
            'last_name',
            'email',
            'address',
            'phone',
            'city',
            'postal_code',
            'country_code',
            'request'
        ]);

        DB::beginTransaction();
        try {
            $reservation = Reservation::create([
                'hotel_id' => $reservationData['hotel']['id'],
                'reservation_number' => $this->createReservationNumber(),
                'check_in' => Carbon::parse($reservationData['check_in']),
                'check_out' => Carbon::parse($reservationData['check_out']),
                'allotment' => intval($reservationData['allotment']),
                'total_nights' => intval($reservationData['total_nights']),
                'reservation_data' => $reservationData,
            ]);

            $reservation->reservationCustomers()->create($customer);

            if (!isset($reservationData['room']) || !isset($reservationData['selectedBeds'])) {
                throw new \Exception('Missing room or bed selection data');
            }

            $reservationRooms = collect(range(0, $reservationData['allotment'] - 1))->map(function ($i) use ($reservationData) {
                if (
                    !isset($reservationData['selectedBeds'][$i]['id']) ||
                    !isset($reservationData['needExtraBeds'][$i]) ||
                    !isset($reservationData['totalExtraBed'][$i]) ||
                    !isset($reservationData['extraBedPrices'][$i]) ||
                    !isset($reservationData['guests'][$i]['adult']) ||
                    !isset($reservationData['guests'][$i]['child'])
                ) {
                    throw new \Exception("Incomplete reservation data for index {$i}");
                }

                return [
                    'room_id' => $reservationData['room']['id'],
                    'bed_id' => $reservationData['selectedBeds'][$i]['id'],
                    'extra_bed_count' => $reservationData['needExtraBeds'][$i] ? $reservationData['totalExtraBed'][$i] : 0,
                    'extra_bed_price' => $reservationData['extraBedPrices'][$i],
                    'adult_guest' => $reservationData['guests'][$i]['adult'],
                    'child_guest' => $reservationData['guests'][$i]['child'],
                ];
            })->toArray();

            $reservation->reservationRooms()->createMany($reservationRooms);

            $reservation->transaction()->create([
                'subtotal' => $request->subtotal,
                'discount' => $request->discount_total,
                'tax_amount' => $request->tax_amount,
                'total_price' => $request->total_price,
                'pay_now' => $request->pay_now,
                'balance_to_be_paid' => $request->balance_to_be_paid,
                'promotion_code' => $request->promotion_code,
            ]);

            DB::commit();
            session()->forget('reservation');
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error storing reservation: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to create reservation: ' . $th->getMessage(),
                'type' => 'error',
            ]);
        }

        dd($reservation->with(['reservationRooms', 'reservationCustomers', 'transaction']));
    }

    protected function createReservationNumber()
    {
        return 'RES-' . Str::upper(Str::random(10)) . '-' . date('Ymd');
    }
}
