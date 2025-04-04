<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;

class HomeController extends Controller
{
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Customer home page.
     *
     * @return \Inertia\ResponseFactory|\Inertia\Response
     */


    /******  d77efcaf-dedd-47e3-b323-9cfb3280b6a1  *******/
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
