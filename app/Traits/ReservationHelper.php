<?php

namespace App\Traits;

use Carbon\Carbon;
use App\Models\Room;
use App\Models\Hotel;
use Illuminate\Support\Collection;

trait ReservationHelper
{
    protected function availableRooms(Hotel $hotel, $checkIn, $checkOut): Hotel|null
    {
        try {
            $dates = $this->collectDates($checkIn, $checkOut);

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
        } catch (\Throwable $th) {
            logger()->error('Error checking availability: ' . $th->getMessage());

            return null;
        }

        return $hotel;
    }

    protected function availableRoom(Room $room, $checkIn, $checkOut): Collection|null
    {
        try {
            $dates = $this->collectDates($checkIn, $checkOut);

            $room->load([
                'allotments' => function ($query) use ($dates) {
                    $query->whereIn('date', $dates)
                        ->where('allotment', '>', 0);
                },
            ]);
        } catch (\Throwable $th) {
            logger()->error('Error checking availability: ' . $th->getMessage());

            return null;
        }

        return $room->allotments;
    }

    protected function dateParser(String $date): Carbon|null
    {
        try {
            return Carbon::parse($date)->timezone('Asia/Makassar')->startOfDay();
        } catch (\Throwable $th) {
            logger()->error('Error parsing date: ' . $th->getMessage());

            return null;
        }
    }

    protected function collectDates(String $checkIn, String $checkOut): Collection
    {
        try {
            $startDate = $this->dateParser($checkIn);
            $endDate = $this->dateParser($checkOut);
            $dates = collect();

            for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
                $dates->push($date->format('Y-m-d'));
            }
        } catch (\Throwable $th) {
            logger()->error('Error collecting dates: ' . $th->getMessage());

            return collect();
        }

        return $dates;
    }

    protected function calculateTotalNights(String $checkIn, String $checkOut): Int
    {
        $startDate = $this->dateParser($checkIn);
        $endDate = $this->dateParser($checkOut);

        return $startDate->diffInDays($endDate);
    }
}
