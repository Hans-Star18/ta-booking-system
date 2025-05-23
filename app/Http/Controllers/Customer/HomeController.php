<?php

namespace App\Http\Controllers\Customer;

use App\Models\Hotel;
use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $hotels = Hotel::all();

        $hotelLink = [];
        foreach ($hotels as $key => $hotel) {
            $hotelLink[$key] = route('customer.reservation.index', $hotel->uuid);
        }

        dd($hotelLink);
    }

    public function reservation()
    {
        return inertia("customers/reservation");
    }

    public function confirmReservation()
    {
        return inertia("customers/reservation-confirm");
    }

    public function finishReservation()
    {
        return inertia("customers/reservation-finish");
    }
}
