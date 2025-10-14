<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Traits\ReservationHelper;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrganizerController extends Controller
{
    use ReservationHelper;

    public function index(Request $request)
    {
        $hotel = auth()->guard('web')->user()->hotel;

        $period    = $request->get('period', 'year');
        $startDate = $this->dateParser($request->get('start_date'));
        $endDate   = $this->dateParser($request->get('end_date'));

        $reservations            = $this->getFiltered('reservation', $hotel, $period, $startDate, $endDate);
        $chartDataReservation    = $this->generateChartReservation($reservations, $period, $startDate, $endDate);
        $chartDataTransaction    = $this->generateChartTransaction($reservations, $period, $startDate, $endDate);
        $guestSummary            = $this->getGuestSummary($hotel->reservations);

        return inertia('organizers/dashboard/index', [
            'period'               => $period,
            'charts'               => [
                'reservation' => $chartDataReservation,
                'transaction' => $chartDataTransaction,
            ],
            'guestSummary' => $guestSummary,
        ]);
    }

    private function getFiltered($item, $hotel, $period, $startDate = null, $endDate = null)
    {
        if ($item === 'reservation') {
            $query = $hotel->reservations()
                ->whereHas('transaction')
                ->with(['transaction']);

            switch ($period) {
                case 'week':
                    $query->whereBetween('created_at', [
                        now()->startOfWeek()->subDays(7),
                        now()->startOfWeek(),
                    ]);
                    break;

                case 'month':
                    $query->whereBetween('created_at', [
                        now()->startOfMonth(),
                        now()->endOfMonth(),
                    ]);
                    break;

                case 'year':
                    $query->whereBetween('created_at', [
                        now()->startOfYear(),
                        now()->endOfYear(),
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

        if ($item === 'transaction') {
            $query = $hotel->reservations()
                ->whereHas('transaction')
                ->with(['transaction']);

            switch ($period) {
                case 'week':
                    $query->whereBetween('created_at', [
                        now()->startOfWeek()->subDays(7),
                        now()->startOfWeek(),
                    ]);
                    break;

                case 'month':
                    $query->whereBetween('created_at', [
                        now()->startOfMonth(),
                        now()->endOfMonth(),
                    ]);
                    break;

                case 'year':
                    $query->whereBetween('created_at', [
                        now()->startOfYear(),
                        now()->endOfYear(),
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
    }

    private function generateChartReservation($reservations, $period, $startDate = null, $endDate = null)
    {
        $categories  = $this->generateCategories($period, $startDate, $endDate);
        $groupedData = $this->groupDataByPeriod($reservations, $period);
        $statuses    = ['confirmed', 'pending', 'cancelled'];

        $series = [];
        foreach ($statuses as $status) {
            $series[] = [
                'name' => ucfirst($status),
                'data' => $this->getDataForStatus($groupedData, $status, $period, $categories),
            ];
        }

        return [
            'series' => $series,
            'xaxis'  => [
                'type'       => 'category',
                'categories' => $categories,
            ],
        ];
    }

    private function generateChartTransaction($reservations, $period, $startDate = null, $endDate = null)
    {
        $categories  = $this->generateCategories($period, $startDate, $endDate);
        $groupedData = $this->groupTransactionByPeriod($reservations, $period);

        $series = [
            [
                'name' => 'Total Income',
                'data' => $this->getTransactionIncomeData($groupedData, $period, $categories),
            ],
            [
                'name' => 'Total Transaction',
                'data' => $this->getTransactionSuccessCountData($groupedData, $period, $categories),
            ],
        ];

        return [
            'series' => $series,
            'xaxis'  => [
                'type'       => 'category',
                'categories' => $categories,
            ],
        ];
    }

    private function getTransactionIncomeData($groupedData, $period, $categories)
    {
        $data = [];
        foreach ($categories as $category) {
            $income  = 0;
            $dateKey = $this->categoryToDateKey($category, $period);
            if ($dateKey && isset($groupedData[$dateKey])) {
                $income = $groupedData[$dateKey]
                    ->whereIn('payment_status', ['success', 'settlement'])
                    ->sum('pay_now');
            }
            $data[] = $income;
        }

        return $data;
    }

    private function getTransactionSuccessCountData($groupedData, $period, $categories)
    {
        $data = [];
        foreach ($categories as $category) {
            $count   = 0;
            $dateKey = $this->categoryToDateKey($category, $period);
            if ($dateKey && isset($groupedData[$dateKey])) {
                $count = $groupedData[$dateKey]
                    ->whereIn('payment_status', ['success', 'settlement'])
                    ->count();
            }
            $data[] = $count;
        }

        return $data;
    }

    private function groupDataByPeriod($reservations, $period)
    {
        switch ($period) {
            case 'week':
            case 'month':
            case 'custom':
                return $reservations->groupBy(
                    fn ($item) => $item->created_at->format('Y-m-d')
                );

            case 'year':
                return $reservations->groupBy(
                    fn ($item) => $item->created_at->format('Y-m')
                );

            default:
                return $reservations->groupBy(
                    fn ($item) => $item->created_at->format('Y-m-d')
                );
        }
    }

    private function groupTransactionByPeriod($reservations, $period)
    {
        // Flat map all transactions from reservations
        $transactions = $reservations->flatMap(function ($reservation) {
            return $reservation->transaction ? [$reservation->transaction] : [];
        });

        switch ($period) {
            case 'week':
            case 'month':
            case 'custom':
                return $transactions->groupBy(
                    fn ($item) => \Carbon\Carbon::parse($item->created_at)->format('Y-m-d')
                );
            case 'year':
                return $transactions->groupBy(
                    fn ($item) => \Carbon\Carbon::parse($item->created_at)->format('Y-m')
                );
            default:
                return $transactions->groupBy(
                    fn ($item) => \Carbon\Carbon::parse($item->created_at)->format('Y-m-d')
                );
        }
    }

    private function getDataForStatus($groupedData, $status, $period, $categories)
    {
        $data = [];
        foreach ($categories as $category) {
            $count   = 0;
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
            logger()->error('Error converting category to date key: '.$e->getMessage());

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
                $endOfMonth   = now()->endOfMonth();

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

    private function getGuestSummary($reservations)
    {
        $confirmedReservations = $reservations->where('status', Reservation::CONFIRMED);

        $customers = $confirmedReservations->map(function ($reservation) {
            return collect($reservation->reservationCustomer ?? []);
        });
        $emailGroups     = $customers->groupBy('email');
        $newGuests       = 0;
        $returningGuests = 0;
        foreach ($emailGroups as $email => $group) {
            if ($group->count() === 1) {
                $newGuests++;
            } elseif ($group->count() > 1) {
                $newGuests++;
                $returningGuests = $returningGuests + ($group->count() - 1);
            }
        }

        $totalGuests = $newGuests + $returningGuests;

        return [
            'total'     => $totalGuests,
            'new'       => $newGuests,
            'returning' => $returningGuests,
        ];
    }
}
