<?php

namespace App\Http\Controllers\Customer;

use App\Models\Hotel;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

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
}
