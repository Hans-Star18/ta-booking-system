<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\UpdateHotelRequest;
use App\Mail\ApprovalMail;
use App\Models\Hotel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class HotelController extends Controller
{
    public function index()
    {
        $hotel = auth()->guard('web')->user()->hotel;

        return inertia('organizers/hotels/index', [
            'hotel' => $hotel,
        ]);
    }

    public function edit(Hotel $hotel)
    {
        return inertia('organizers/hotels/edit', [
            'hotel' => $hotel,
        ]);
    }

    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        DB::beginTransaction();
        try {
            $hotel->update($request->validated());

            if ($hotel->is_active && ! $hotel->approved_at) {
                $user = $hotel->user;
                Mail::send(new ApprovalMail($user, $hotel));
                $hotel->approved_at = now();
                $hotel->save();
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            logger()->error('Error updating hotel: ' . $e->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update hotel',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Hotel updated successfully',
            'type'    => 'success',
        ]);
    }
}
