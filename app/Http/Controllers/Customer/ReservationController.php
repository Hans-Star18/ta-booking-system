<?php

namespace App\Http\Controllers\Customer;

use App\Models\Hotel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CheckAvaibilityRequest;

class ReservationController extends Controller
{
    public function index(Hotel $hotel)
    {
        $hotel->load(['rooms', 'rooms.photos', 'rooms.allotments']);

        return inertia("customers/reservation", [
            "hotel" => $hotel,
        ]);
    }

    public function checkAvailability(CheckAvaibilityRequest $request, Hotel $hotel)
    {
        dd($request->all());
    }
}
