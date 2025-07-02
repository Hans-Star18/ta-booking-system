<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;

class OrganizerController extends Controller
{
    public function index()
    {
        $hotel = auth()->guard('web')->user()->hotel;
        $reservations = $hotel->reservations()
            ->whereHas('transaction')
            ->with(['transaction', 'hotel', 'reservationCustomer', 'reservationRooms'])
            ->get();

        return inertia('organizers/dashboard/index', [
            'hotel' => $hotel,
            'reservations' => $reservations,
        ]);
    }
}
