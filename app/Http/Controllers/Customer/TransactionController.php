<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function check(Request $request)
    {
        try {
            $reservationNumber = $request->query('reservation_number', null);

            if (! $reservationNumber) {
                return inertia('customers/transaction-check', [
                    'reservation' => null,
                ]);
            }

            $reservation = Reservation::where('reservation_number', $reservationNumber)
                ->with(['hotel', 'transaction'])
                ->firstOrFail();
        } catch (\Throwable $th) {
            logger()->error('Error checking transaction: '.$th->getMessage());

            return inertia('customers/transaction-check', [
                'reservation' => null,
            ])->with('alert', [
                'message' => 'Reservation not found, please input valid reservation number',
                'type'    => 'error',
            ]);
        }

        return inertia('customers/transaction-check', [
            'reservation' => $reservation,
        ]);
    }
}
