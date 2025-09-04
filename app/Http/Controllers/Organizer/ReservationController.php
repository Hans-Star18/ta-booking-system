<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function index()
    {
        $hotel        = auth()->guard('web')->user()->hotel;
        $reservations = $hotel->reservations()
            ->whereHas('transaction')
            ->with(['transaction'])
            ->orderByDesc('created_at')
            ->get();

        return inertia('organizers/reservations/index', [
            'reservations' => $reservations,
        ]);
    }

    public function show(Reservation $reservation)
    {
        $reservation->load(['transaction', 'hotel', 'reservationCustomer', 'reservationRooms']);

        return inertia('organizers/reservations/show', [
            'reservation' => $reservation,
        ]);
    }

    public function edit(Reservation $reservation)
    {
        $reservation->load(['transaction', 'reservationCustomer']);

        return inertia('organizers/reservations/edit', [
            'reservation' => $reservation,
        ]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status'         => 'required|in:pending,confirmed,cancelled',
            'payment_status' => 'required|in:pending,success,capture,settlement,expire,refund,failed',
        ]);

        DB::beginTransaction();
        try {
            $reservation->status                      = $request->status;
            $reservation->transaction->payment_status = $request->payment_status;
            $reservation->transaction->save();
            $reservation->save();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error updating reservation: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update reservation',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Reservation updated successfully',
            'type'    => 'success',
        ]);
    }
}
