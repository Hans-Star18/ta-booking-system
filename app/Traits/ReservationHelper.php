<?php

namespace App\Traits;

use App\Models\Hotel;
use App\Models\Reservation;
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
                'rooms' => function ($query) use ($dates) {
                    $query->whereHas('allotments', function ($q) use ($dates) {
                        $q->whereIn('date', $dates);
                    }, '=', $dates->count());
                },
                'rooms.allotments' => function ($query) use ($dates) {
                    $query->whereIn('date', $dates);
                },
                'rooms.roomReservations.reservation' => function ($query) {
                    $query->whereIn('status', [Reservation::PENDING, Reservation::CONFIRMED])
                        ->whereHas('transaction');
                },
            ]);

            $hotel->rooms = $hotel->rooms->filter(function ($room) use ($dates, $allotment) {
                $availableAllotments = $this->calculateAvailableAllotments($room, $dates, $allotment);
                $isAvailable         = ! blank($availableAllotments);

                return $isAvailable;
            });
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
                'allotments' => function ($query) use ($dates) {
                    $query->whereIn('date', $dates);
                },
                'roomReservations.reservation' => function ($query) {
                    $query->whereIn('status', [Reservation::PENDING, Reservation::CONFIRMED])
                        ->whereHas('transaction');
                },
            ]);

            $availableAllotments = $this->calculateAvailableAllotments($room, $dates, $allotment);

            return $availableAllotments;
        } catch (\Throwable $th) {
            logger()->error('Error checking availability: '.$th->getMessage());

            return null;
        }
    }

    protected function dateParser(?string $date): ?Carbon
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

    protected function calculateAvailableAllotments(Room $room, Collection $dates, int $requiredAllotment): Collection
    {
        $availableAllotments = collect();

        foreach ($dates as $date) {
            $allotment = $room->allotments()->where('date', $date)->first();

            if (! $allotment) {
                continue;
            }

            $onRes = $room->roomReservations
                ->filter(function ($roomReservation) use ($date) {
                    $reservation = $roomReservation->reservation;
                    $checkIn     = $this->dateParser($reservation->check_in);
                    $checkOut    = $this->dateParser($reservation->check_out);

                    $currentDate = $this->dateParser($date);

                    return $currentDate->gte($checkIn) && $currentDate->lt($checkOut);
                })
                ->sum('reservation.allotment');

            $available = max(0, $allotment->allotment - $onRes);

            if ($available >= $requiredAllotment) {
                $availableAllotments->push([
                    'date'      => $date,
                    'allotment' => $allotment->allotment,
                    'onRes'     => $onRes,
                    'available' => $available,
                    'required'  => $requiredAllotment,
                ]);
            }
        }

        return $availableAllotments;
    }
}
