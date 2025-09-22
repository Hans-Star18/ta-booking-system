<?php

namespace App\Http\Controllers\Organizer;

use App\Exports\ReservationsExport;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $hotel             = auth()->guard('web')->user()->hotel;
        $reservationStatus = $request->get('reservation_status', null);
        $transactionStatus = $request->get('transaction_status', null);
        $reservations      = $hotel->reservations()
            ->whereHas('transaction')
            ->with(['transaction'])
            ->orderByDesc('created_at')
            ->when($reservationStatus, function ($query) use ($reservationStatus) {
                $query->where('status', $reservationStatus);
            })
            ->when($transactionStatus, function ($query) use ($transactionStatus) {
                $query->whereHas('transaction', function ($query) use ($transactionStatus) {
                    $query->where('payment_status', $transactionStatus);
                });
            })
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
            logger()->error('Error updating reservation: '.$th->getMessage());

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

    public function excelExport()
    {
        $extension = 'xlsx';
        $filename  = 'reservations'.'-'.Str::random(10).'.'.$extension;

        return Excel::download(new ReservationsExport, $filename);
    }
}
