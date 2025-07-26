<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Hotel;

class HomeController extends Controller
{
    public function index()
    {
        $hotels  = Hotel::active()->get();
        $clients = $hotels->map(function ($hotel) {
            return [
                'name' => $hotel->name,
                'url'  => url($hotel->uuid),
            ];
        });

        return inertia('customers/home', [
            'clients' => $clients,
        ]);
    }
}
