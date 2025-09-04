<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
