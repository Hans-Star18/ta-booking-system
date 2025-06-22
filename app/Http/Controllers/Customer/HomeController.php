<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Hotel;

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
