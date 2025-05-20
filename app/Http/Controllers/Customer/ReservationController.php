<?php

namespace App\Http\Controllers\Customer;

use App\Models\Hotel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CheckAvaibilityRequest;
use Carbon\Carbon;

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
        $startDate = Carbon::parse($request->check_in)->timezone('Asia/Makassar')->startOfDay();
        $endDate = Carbon::parse($request->check_out)->timezone('Asia/Makassar')->startOfDay();
        $dates = collect();

        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
            $dates->push($date->format('Y-m-d'));
        }

        $hotel->load([
            'rooms' => function ($query) use ($dates) {
                $query->whereHas('allotments', function ($q) use ($dates) {
                    $q->whereIn('date', $dates)
                        ->where('allotment', '>', 0);
                }, '=', $dates->count());
            },
            'rooms.photos',
            'rooms.allotments' => function ($query) use ($dates) {
                $query->whereIn('date', $dates)
                    ->where('allotment', '>', 0);
            },
        ]);

        return inertia("customers/reservation", [
            "hotel" => $hotel,
        ]);
    }
}
