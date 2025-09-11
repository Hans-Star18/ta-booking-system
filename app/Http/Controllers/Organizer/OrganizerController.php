<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Traits\ReservationHelper;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrganizerController extends Controller
{
    use ReservationHelper;

    public function index(Request $request)
    {
        $hotel = auth()->guard('web')->user()->hotel;

        $period = $request->get('period', 'week');
        $startDate = $this->dateParser($request->get('start_date'));
        $endDate = $this->dateParser($request->get('end_date'));

        $reservations = $this->getFilteredReservations($hotel, $period, $startDate, $endDate);

        $chartData = $this->generateChartData($reservations, $period, $startDate, $endDate);

        return inertia('organizers/dashboard/index', [
            'period' => $period,
            'chartDataReservation' => $chartData,
        ]);
    }

    private function getFilteredReservations($hotel, $period, $startDate = null, $endDate = null)
    {
        $query = $hotel->reservations()
            ->whereHas('transaction')
            ->with(['transaction']);

        switch ($period) {
            case 'week':
                $query->whereBetween('created_at', [
                    now()->startOfWeek(),
                    now()->endOfWeek()
                ]);
                break;

            case 'month':
                $query->whereBetween('created_at', [
                    now()->startOfMonth(),
                    now()->endOfMonth()
                ]);
                break;

            case 'year':
                $query->whereBetween('created_at', [
                    now()->startOfYear(),
                    now()->endOfYear()
                ]);
                break;

            case 'custom':
                if ($startDate && $endDate) {
                    $query->whereBetween('created_at', [$startDate, $endDate]);
                }
                break;
        }

        return $query->get();
    }

    private function generateChartData($reservations, $period, $startDate = null, $endDate = null)
    {
        // Generate categories first
        $categories = $this->generateCategories($period, $startDate, $endDate);

        // Group data
        $groupedData = $this->groupDataByPeriod($reservations, $period);

        $statuses = ['confirmed', 'pending', 'cancelled'];

        $series = [];
        foreach ($statuses as $status) {
            $series[] = [
                'name' => ucfirst($status),
                'data' => $this->getDataForStatus($groupedData, $status, $period, $categories)
            ];
        }

        return [
            'series' => $series,
            'xaxis' => [
                'type' => 'category',
                'categories' => $categories
            ]
        ];
    }

    private function groupDataByPeriod($reservations, $period)
    {
        switch ($period) {
            case 'week':
            case 'month':
            case 'custom':
                return $reservations->groupBy(function ($item) {
                    return $item->created_at->format('Y-m-d');
                });

            case 'year':
                return $reservations->groupBy(function ($item) {
                    return $item->created_at->format('Y-m');
                });

            default:
                return $reservations->groupBy(function ($item) {
                    return $item->created_at->format('Y-m-d');
                });
        }
    }

    private function getDataForStatus($groupedData, $status, $period, $categories)
    {
        $data = [];

        foreach ($categories as $category) {
            $count = 0;

            // Convert category back to date key for lookup
            $dateKey = $this->categoryToDateKey($category, $period);

            if ($dateKey && isset($groupedData[$dateKey])) {
                $count = $groupedData[$dateKey]->where('status', $status)->count();
            }

            $data[] = $count;
        }

        return $data;
    }

    private function categoryToDateKey($category, $period)
    {
        try {
            switch ($period) {
                case 'week':
                case 'month':
                case 'custom':
                    // Convert "06 Sep 25" back to "2025-09-06"
                    $date = Carbon::createFromFormat('d M y', $category);
                    return $date->format('Y-m-d');

                case 'year':
                    // Convert "Sep 25" back to "2025-09"
                    $date = Carbon::createFromFormat('M y', $category);
                    return $date->format('Y-m');

                default:
                    return null;
            }
        } catch (\Exception $e) {
            // Log error if needed
            return null;
        }
    }

    private function generateCategories($period, $startDate = null, $endDate = null)
    {
        $categories = [];

        switch ($period) {
            case 'week':
                for ($i = 6; $i >= 0; $i--) {
                    $categories[] = now()->subDays($i)->format('d M y');
                }
                break;

            case 'month':
                $startOfMonth = now()->startOfMonth();
                $endOfMonth = now()->endOfMonth();

                for ($date = $startOfMonth->copy(); $date <= $endOfMonth; $date->addDay()) {
                    $categories[] = $date->format('d M y');
                }
                break;

            case 'year':
                for ($i = 1; $i <= 12; $i++) {
                    $categories[] = now()->month($i)->startOfMonth()->format('M y');
                }
                break;

            case 'custom':
                if ($startDate && $endDate) {
                    $currentDate = $startDate->copy();

                    while ($currentDate <= $endDate) {
                        $categories[] = $currentDate->format('d M y');
                        $currentDate->addDay();
                    }
                }
                break;

            default:
                $categories[] = $startDate ? $startDate->format('d M y') : now()->format('d M y');
                break;
        }

        return $categories;
    }
}
