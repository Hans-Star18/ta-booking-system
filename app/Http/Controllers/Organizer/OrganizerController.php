<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Reservation;

class OrganizerController extends Controller
{
    public function index()
    {
        $hotel = auth()->guard('web')->user()->hotel;
        $reservations = $hotel->reservations()
            ->whereHas('transaction')
            ->with(['transaction'])
            ->get();

        return inertia('organizers/dashboard/index', [
            'hotel' => $hotel,
            'reservations' => $reservations,
        ]);
    }

    public function show(Reservation $reservation)
    {
        $reservation->load(['transaction', 'hotel', 'reservationCustomer', 'reservationRooms']);

        return inertia('organizers/reservations/show', [
            'reservation' => $reservation,
        ]);
    }
}
