<?php

namespace App\Http\Controllers\Customer;

use App\Models\Hotel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CheckAvaibilityRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReservationController extends Controller
{
    public function index(Request $request, Hotel $hotel)
    {
        // Jika ada parameter check_in dan check_out di URL (GET request)
        if ($request->has(['check_in', 'check_out'])) {
            $startDate = Carbon::parse($request->check_in)->startOfDay()->timezone('Asia/Makassar');
            $endDate = Carbon::parse($request->check_out)->startOfDay()->timezone('Asia/Makassar');

            $hotel->load(['rooms' => function ($query) use ($startDate, $endDate) {
                $query->whereHas('allotments', function ($q) use ($startDate, $endDate) {
                    $q->whereDate('date', '>=', $startDate->format('Y-m-d'))
                        ->whereDate('date', '<=', $endDate->format('Y-m-d'))
                        ->where('allotment', '>', 0);
                });
            }, 'rooms.photos', 'rooms.allotments' => function ($query) use ($startDate, $endDate) {
                $query->whereDate('date', '>=', $startDate->format('Y-m-d'))
                    ->whereDate('date', '<=', $endDate->format('Y-m-d'))
                    ->where('allotment', '>', 0);
            }]);
        } else {
            $hotel->load(['rooms', 'rooms.photos', 'rooms.allotments']);
        }

        return inertia("customers/reservation", [
            "hotel" => $hotel,
        ]);
    }

    public function checkAvailability(CheckAvaibilityRequest $request, Hotel $hotel)
    {
        $startDate = Carbon::parse($request->check_in)->startOfDay()->timezone('Asia/Makassar');
        $endDate = Carbon::parse($request->check_out)->startOfDay()->timezone('Asia/Makassar');

        $hotel->load(['rooms' => function ($query) use ($startDate, $endDate) {
            $query->whereHas('allotments', function ($q) use ($startDate, $endDate) {
                $q->whereDate('date', '>=', $startDate->format('Y-m-d'))
                    ->whereDate('date', '<=', $endDate->format('Y-m-d'))
                    ->where('allotment', '>', 0);
            });
        }, 'rooms.photos', 'rooms.allotments' => function ($query) use ($startDate, $endDate) {
            $query->whereDate('date', '>=', $startDate->format('Y-m-d'))
                ->whereDate('date', '<=', $endDate->format('Y-m-d'))
                ->where('allotment', '>', 0);
        }]);

        return inertia("customers/reservation", [
            "hotel" => $hotel,
        ]);
    }
}
