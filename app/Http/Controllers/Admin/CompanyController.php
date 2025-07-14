<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        $hotels = Hotel::all();

        return inertia('admins/hotels/index', [
            'hotels' => $hotels,
        ]);
    }
}
