<?php

namespace App\Services;

use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ReservationService
{
    public function validateReservationData($reservationData)
    {
        return $reservationData &&
            isset($reservationData['hotel']) &&
            isset($reservationData['hotel']['id']);
    }

    public function createReservation($reservationData)
    {
        return Reservation::create([
            'hotel_id'           => $reservationData['hotel']['id'],
            'reservation_number' => $this->createReservationNumber(),
            'check_in'           => Carbon::parse($reservationData['check_in']),
            'check_out'          => Carbon::parse($reservationData['check_out']),
            'allotment'          => intval($reservationData['allotment']),
            'total_nights'       => intval($reservationData['total_nights']),
            'reservation_data'   => $reservationData,
        ]);
    }

    public function createReservationCustomer($reservation, $request)
    {
        $customer = $request->safe()->only([
            'first_name',
            'last_name',
            'email',
            'address',
            'phone',
            'city',
            'postal_code',
            'country_code',
            'request',
        ]);

        $reservation->reservationCustomer()->create($customer);
    }

    public function createReservationRooms($reservation, $reservationData)
    {
        if (! isset($reservationData['room']) || ! isset($reservationData['selectedBeds'])) {
            throw new \Exception('Missing room or bed selection data');
        }

        $reservationRooms = collect(range(0, $reservationData['allotment'] - 1))
            ->map(function ($i) use ($reservationData) {
                $this->validateRoomData($reservationData, $i);

                return [
                    'room_id'         => $reservationData['room']['id'],
                    'bed_id'          => $reservationData['selectedBeds'][$i]['id'],
                    'extra_bed_count' => $reservationData['needExtraBeds'][$i] ? $reservationData['totalExtraBed'][$i] : 0,
                    'extra_bed_price' => $reservationData['extraBedPrices'][$i],
                    'adult_guest'     => $reservationData['guests'][$i]['adult'],
                    'child_guest'     => $reservationData['guests'][$i]['child'],
                ];
            })
            ->toArray();

        $reservation->reservationRooms()->createMany($reservationRooms);
    }

    public function validateRoomData($reservationData, $index)
    {
        if (
            ! isset($reservationData['selectedBeds'][$index]['id']) ||
            ! isset($reservationData['needExtraBeds'][$index]) ||
            ! isset($reservationData['totalExtraBed'][$index]) ||
            ! isset($reservationData['extraBedPrices'][$index]) ||
            ! isset($reservationData['guests'][$index]['adult']) ||
            ! isset($reservationData['guests'][$index]['child'])
        ) {
            throw new \Exception("Incomplete reservation data for index {$index}");
        }
    }

    public function createReservationTransaction($reservation, $request)
    {
        $reservation->transaction()->create([
            'subtotal'           => $request->subtotal,
            'discount'           => $request->discount_total,
            'tax_amount'         => $request->tax_amount,
            'total_price'        => $request->total_price,
            'pay_now'            => $request->pay_now,
            'balance_to_be_paid' => $request->balance_to_be_paid,
            'promotion_code'     => $request->promotion_code,
        ]);
    }

    public function createReservationNumber()
    {
        return 'RES-'.Str::upper(Str::random(10)).'-'.date('Ymd');
    }
}
