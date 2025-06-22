<?php

namespace App\Traits;

use App\Models\Hotel;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Support\Collection;

trait ReservationHelper
{
    protected function availableRooms(Hotel $hotel, string $checkIn, string $checkOut, ?int $allotment = 1): ?Hotel
    {
        try {
            $dates = $this->collectDates($checkIn, $checkOut);

            $hotel->load([
                'rooms' => function ($query) use ($dates, $allotment) {
                    $query->whereHas('allotments', function ($q) use ($dates, $allotment) {
                        $q->whereIn('date', $dates)
                            ->where('allotment', '>=', $allotment);
                    }, '=', $dates->count());
                },
                'rooms.photos',
                'rooms.allotments' => function ($query) use ($dates, $allotment) {
                    $query->whereIn('date', $dates)
                        ->where('allotment', '>=', $allotment);
                },
            ]);
        } catch (\Throwable $th) {
            logger()->error('Error checking availability: '.$th->getMessage());

            return null;
        }

        return $hotel;
    }

    protected function availableRoom(Room $room, string $checkIn, string $checkOut, ?int $allotment = 1): ?Collection
    {
        try {
            $dates = $this->collectDates($checkIn, $checkOut);

            $room->load([
                'allotments' => function ($query) use ($dates, $allotment) {
                    $query->whereIn('date', $dates)
                        ->where('allotment', '>=', $allotment);
                },
            ]);
        } catch (\Throwable $th) {
            logger()->error('Error checking availability: '.$th->getMessage());

            return null;
        }

        return $room->allotments;
    }

    protected function dateParser(string $date): ?Carbon
    {
        try {
            return Carbon::parse($date)->timezone('Asia/Makassar')->startOfDay();
        } catch (\Throwable $th) {
            logger()->error('Error parsing date: '.$th->getMessage());

            return null;
        }
    }

    protected function collectDates(string $checkIn, string $checkOut): Collection
    {
        try {
            $startDate = $this->dateParser($checkIn);
            $endDate   = $this->dateParser($checkOut);
            $dates     = collect();

            for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
                $dates->push($date->format('Y-m-d'));
            }
        } catch (\Throwable $th) {
            logger()->error('Error collecting dates: '.$th->getMessage());

            return collect();
        }

        return $dates;
    }

    protected function calculateTotalNights(string $checkIn, string $checkOut): int
    {
        $startDate = $this->dateParser($checkIn);
        $endDate   = $this->dateParser($checkOut);

        return $startDate->diffInDays($endDate);
    }
}
