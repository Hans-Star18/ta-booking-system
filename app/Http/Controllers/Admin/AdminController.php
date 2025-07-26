<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Amenity;
use App\Models\Bed;
use App\Models\Hotel;
use App\Models\Policy;
use App\Models\User;

class AdminController extends Controller
{
    public function index()
    {
        $userOverview = [
            'total'    => User::count(),
            'increase' => $this->getUserIncrease(),
        ];

        $hotelOverview = [
            'total'    => Hotel::count(),
            'increase' => $this->getHotelIncrease(),
        ];

        $itemCount = [
            'beds'      => Bed::count(),
            'amenities' => Amenity::count(),
            'policies'  => Policy::count(),
        ];

        return inertia('admins/dashboard/index', [
            'userOverview'  => $userOverview,
            'hotelOverview' => $hotelOverview,
            'itemCount'     => $itemCount,
        ]);
    }

    protected function getUserIncrease()
    {
        $rangeDays = 30;

        $startDate = now()->subDays($rangeDays);
        $endDate   = now();

        $userCount = User::whereBetween('created_at', [$startDate, $endDate])->count();

        return $userCount;
    }

    protected function getHotelIncrease()
    {
        $rangeDays = 30;

        $startDate = now()->subDays($rangeDays);
        $endDate   = now();

        $hotelCount = Hotel::whereBetween('created_at', [$startDate, $endDate])->count();

        return $hotelCount;
    }
}
