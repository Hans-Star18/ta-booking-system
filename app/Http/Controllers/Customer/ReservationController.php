<?php

namespace App\Http\Controllers\Customer;

use App\Models\Room;
use App\Models\Hotel;
use App\Traits\ReservationHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CheckAvaibilityRequest;

class ReservationController extends Controller
{
    use ReservationHelper;

    public function index(Hotel $hotel)
    {
        $hotel->load(['rooms', 'rooms.photos', 'rooms.allotments']);

        return inertia("customers/reservation", [
            "hotel" => $hotel,
        ]);
    }

    public function checkAvailability(CheckAvaibilityRequest $request, Hotel $hotel)
    {
        $hasCheckAvailability = false;
        try {
            if ($hotel = $this->availableRooms($hotel, $request->check_in, $request->check_out)) {
                session()->put('reservation', [
                    'hotel' => $hotel,
                    'check_in' => $request->check_in,
                    'check_out' => $request->check_out,
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
        ]);
    }

    public function confirm(Hotel $hotel, Room $room)
    {
        $reservation = session()->get('reservation');

        if (!$reservation) {
            return to_route('customer.reservation.index', $hotel->uuid)->with('alert', [
                'message' => 'Reservation not found',
                'type' => 'error',
            ]);
        }

        // if ($reservation) {
        //     $reservation['room'] = $room;
        // }

        // return inertia("customers/reservation", [
        //     "hotel" => $hotel,
        //     "room" => $room,
        //     "reservation" => $reservation,
        // ]);
    }
}
