<?php

namespace App\Http\Controllers\Customer;

use App\Models\Room;
use App\Models\Hotel;
use App\Models\Policy;
use Illuminate\Http\Request;
use App\Traits\ReservationHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CheckAvaibilityRequest;

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

        return inertia("customers/reservation-confirm", [
            "reservation" => $reservation,
            "policies" => $this->policies,
        ]);
    }
}
