<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(): \Inertia\ResponseFactory|\Inertia\Response
    {
        return inertia("customers/home");
    }

    public function reservation(): \Inertia\ResponseFactory|\Inertia\Response
    {
        return inertia("customers/reservation");
    }

    public function confirmReservation(): \Inertia\ResponseFactory|\Inertia\Response
    {
        return inertia("customers/reservation-confirm");
    }

    public function finishReservation(): \Inertia\ResponseFactory|\Inertia\Response
    {
        return inertia("customers/reservation-finish");
    }
}
