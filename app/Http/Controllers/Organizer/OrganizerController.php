<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;

class OrganizerController extends Controller
{
    public function index()
    {
        $hotel        = auth()->guard('web')->user()->hotel;
        $reservations = $hotel->reservations()
            ->whereHas('transaction')
            ->with(['transaction'])
            ->get();

        return inertia('organizers/dashboard/index', [
            'reservations' => $reservations,
        ]);
    }
}
