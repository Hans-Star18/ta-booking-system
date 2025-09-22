<?php

namespace Database\Seeders\stub;

use App\Models\Hotel;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $reservationCount  = 50;

        for ($i = 0; $i < $reservationCount; $i++) {
            $hotel             = Hotel::find(fake()->randomElement(Hotel::pluck('id')));
            $totalNights       = fake()->numberBetween(1, 5);
            $checkIn           = fake()->dateTimeBetween('now', '+3 weeks')->format('Y-m-d');
            $checkOut          = Carbon::parse($checkIn)->addDays($totalNights)->format('Y-m-d');
            $allotment         = fake()->numberBetween(1, 3);
            $transactionStatus = fake()->randomElement(['pending', 'settlement', 'success', 'expire']);
            $reservationStatus = $transactionStatus === 'pending' ? Reservation::PENDING
                : ($transactionStatus === 'expire' ? Reservation::CANCELLED : Reservation::CONFIRMED
                );

            $reservation = Reservation::create([
                'hotel_id'           => $hotel->id,
                'reservation_number' => $this->createReservationNumber(),
                'check_in'           => $checkIn,
                'check_out'          => $checkOut,
                'allotment'          => $allotment,
                'total_nights'       => $totalNights,
                'status'             => $reservationStatus,
                'created_at'         => $checkIn,
            ]);

            $room               = $hotel->rooms->random();
            $bed                = $room->beds->random();
            $extraBedPrice      = $hotel->setting->extra_bed_price;
            $adultGuest         = fake()->numberBetween(1, 3);
            $childGuest         = fake()->numberBetween(0, 2);
            $extraBedCount      = $this->getExtraBed($adultGuest + $childGuest, $bed->capacity);
            $extraBedCountPrice = $this->calculateExtraBedPrice($extraBedCount, $extraBedPrice);

            $reservation->reservationRooms()->create([
                'reservation_id'  => $reservation->id,
                'room_id'         => $room->id,
                'bed_id'          => $bed->id,
                'extra_bed_count' => $extraBedCount,
                'extra_bed_price' => $extraBedCountPrice,
                'adult_guest'     => $adultGuest,
                'child_guest'     => $childGuest,
            ]);

            $firstName   = fake()->firstName();
            $lastName    = fake()->lastName();
            $email       = fake()->email();
            $address     = fake()->address();
            $phone       = fake()->phoneNumber();
            $city        = fake()->city();
            $postalCode  = fake()->postcode();
            $countryCode = fake()->countryCode();
            $request     = fake()->boolean() ? fake()->text() : null;

            $reservation->reservationCustomer()->create([
                'reservation_id' => $reservation->id,
                'first_name'     => $firstName,
                'last_name'      => $lastName,
                'email'          => $email,
                'address'        => $address,
                'phone'          => $phone,
                'city'           => $city,
                'postal_code'    => $postalCode,
                'country_code'   => $countryCode,
                'request'        => $request,
            ]);

            $subtotal        = $this->getSubtotal($room->price, $allotment, $totalNights, $extraBedCountPrice);
            $taxAmount       = $this->getTaxAmount($subtotal, $hotel->setting->tax_percentage);
            $totalPrice      = $this->getTotalPrice($subtotal, $taxAmount);
            $payNow          = $this->getPayNow($totalPrice, $hotel->setting->dp_percentage);
            $balanceToBePaid = $this->getBalanceToBePaid($totalPrice, $payNow);

            $reservation->transaction()->create([
                'reservation_id'     => $reservation->id,
                'invoice_number'     => $this->createInvoiceNumber(),
                'payment_status'     => $transactionStatus,
                'subtotal'           => $subtotal,
                'tax_amount'         => $taxAmount,
                'total_price'        => $totalPrice,
                'pay_now'            => $payNow,
                'balance_to_be_paid' => $balanceToBePaid,
            ]);
        }
    }

    protected function createReservationNumber()
    {
        return 'RES-'.Str::upper(Str::random(10)).'-'.date('Ymd');
    }

    protected function createInvoiceNumber()
    {
        return 'INV-'.strtoupper(uniqid());
    }

    protected function getExtraBed(int $guest, int $bedCapacity)
    {
        return $guest - $bedCapacity;
    }

    protected function calculateExtraBedPrice(int $extraBedCount, int $extraBedPrice)
    {
        return $extraBedCount * $extraBedPrice;
    }

    protected function getSubtotal(int $roomPrice, int $allotments, int $totalNights, int $extraBedCountPrice)
    {
        return $roomPrice * $allotments * $totalNights + $extraBedCountPrice;
    }

    protected function getTaxAmount(float $subtotal, int $taxPercentage)
    {
        return floor($subtotal * ($taxPercentage / 100));
    }

    protected function getTotalPrice(float $subtotal, float $taxAmount)
    {
        return floor($subtotal + $taxAmount);
    }

    protected function getPayNow(float $totalPrice, int $dpPercentage)
    {
        return floor($totalPrice * ($dpPercentage / 100));
    }

    protected function getBalanceToBePaid(float $totalPrice, float $payNow)
    {
        return floor($totalPrice - $payNow);
    }
}
