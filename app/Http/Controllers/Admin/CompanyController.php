<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHotelRequest;
use App\Http\Requests\Organizer\UpdateHotelRequest;
use App\Mail\ApprovalMail;
use App\Models\Hotel;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class CompanyController extends Controller
{
    public function index()
    {
        $hotels = Hotel::orderBy('created_at', 'desc')->with('user')->get();

        return inertia('admins/hotels/index', [
            'hotels' => $hotels,
        ]);
    }

    public function create()
    {
        $hotelOrganizerOptions = User::where('role_id', Role::HOTEL_ORGANIZER)->get()->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name,
            ];
        });

        return inertia('admins/hotels/add', [
            'hotelOrganizerOptions' => $hotelOrganizerOptions,
        ]);
    }

    public function store(StoreHotelRequest $request)
    {
        DB::beginTransaction();
        try {
            Hotel::create($request->validated());

            DB::commit();
        } catch (\Throwable $th) {
            logger()->error('Error creating hotel: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to create hotel',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.companies.index')->with('alert', [
            'message' => 'Hotel created successfully',
            'type'    => 'success',
        ]);
    }

    public function show(Hotel $hotel)
    {
        return inertia('admins/hotels/show', [
            'hotel' => $hotel->load('user'),
        ]);
    }

    public function edit(Hotel $hotel)
    {
        $hotelOrganizerOptions = User::where('role_id', Role::HOTEL_ORGANIZER)->get()->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name,
            ];
        });

        return inertia('admins/hotels/edit', [
            'hotel'                 => $hotel,
            'hotelOrganizerOptions' => $hotelOrganizerOptions,
        ]);
    }

    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        DB::beginTransaction();
        try {
            $hotel->update($request->validated());

            if ($hotel->is_active && ! $hotel->approved_at) {
                $user = $hotel->user;
                try {
                    Mail::send(new ApprovalMail($user, $hotel));
                } catch (\Throwable $th) {
                    logger()->error('Error sending approval email: ' . $th->getMessage());
                }
                $hotel->approved_at = now();
                $hotel->save();
            }

            DB::commit();
        } catch (\Throwable $th) {
            logger()->error('Error updating hotel: ' . $th->getMessage());

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

    public function destroy(Hotel $hotel)
    {
        DB::beginTransaction();
        try {
            if ($hotel->reservations()->exists()) {
                return back()->with('alert', [
                    'message' => "You can't delete this hotel because it has reservations",
                    'type'    => 'error',
                ]);
            }

            $hotel->delete();
            DB::commit();
        } catch (\Throwable $th) {
            logger()->error('Error deleting hotel: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to delete hotel',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.companies.index')->with('alert', [
            'message' => 'Hotel deleted successfully',
            'type'    => 'success',
        ]);
    }
}
