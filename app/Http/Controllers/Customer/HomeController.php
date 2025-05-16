<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // return inertia("customers/home");
        dd("test");
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
