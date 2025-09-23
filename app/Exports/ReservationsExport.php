<?php

namespace App\Exports;

use Illuminate\Support\Number;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ReservationsExport implements FromCollection, WithHeadings, WithStyles
{
    public function collection()
    {
        $user         = auth()->guard('web')->user();
        $hotel        = $user->hotel;
        $reservations = $hotel->reservations()->get();
        $index        = 1;

        // return $reservations->map(function ($reservation) use (&$index) {
        //     return collect([
        //         $index++,
        //         $reservation->reservationCustomer->first_name.' '.$reservation->reservationCustomer->last_name,
        //         $reservation->reservationCustomer->email,
        //         $reservation->reservation_number,
        //         $reservation->status,
        //         $reservation->transaction->payment_status,
        //         Number::currency($reservation->transaction->subtotal, in: 'IDR', locale: 'id', precision: 0),
        //         Number::currency($reservation->transaction->tax_amount, in: 'IDR', locale: 'id', precision: 0),
        //         Number::currency($reservation->transaction->discount ?? 0, in: 'IDR', locale: 'id', precision: 0),
        //         Number::currency($reservation->transaction->total_price, in: 'IDR', locale: 'id', precision: 0),
        //         Number::currency($reservation->transaction->pay_now, in: 'IDR', locale: 'id', precision: 0),
        //         Number::currency($reservation->transaction->balance_to_be_paid, in: 'IDR', locale: 'id', precision: 0),
        //     ]);
        // });
        //
        return $reservations->map(fn($reservation) => collect([
            $index++,
            $reservation->reservationCustomer->first_name.' '.$reservation->reservationCustomer->last_name,
            $reservation->reservationCustomer->email,
            $reservation->reservation_number,
            $reservation->status,
            $reservation->transaction->payment_status,
            Number::currency($reservation->transaction->subtotal, in: 'IDR', locale: 'id', precision: 0),
            Number::currency($reservation->transaction->tax_amount, in: 'IDR', locale: 'id', precision: 0),
            Number::currency($reservation->transaction->discount ?? 0, in: 'IDR', locale: 'id', precision: 0),
            Number::currency($reservation->transaction->total_price, in: 'IDR', locale: 'id', precision: 0),
            Number::currency($reservation->transaction->pay_now, in: 'IDR', locale: 'id', precision: 0),
            Number::currency($reservation->transaction->balance_to_be_paid, in: 'IDR', locale: 'id', precision: 0),
        ]));

    }

    public function headings(): array
    {
        return [
            'No.',
            'Customer Name',
            'Customer Email',
            'Reservation Number',
            'Reservation Status',
            'Transaction Status',
            'Subtotal',
            'Tax',
            'Discount',
            'Total',
            'Deposit',
            'Remaining Payment',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1    => ['font' => ['bold' => true]],
        ];
    }
}
