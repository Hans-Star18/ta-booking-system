<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\UpdateHotelRequest;
use App\Models\Hotel;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    public function index()
    {
        $hotels = Hotel::all();

        return inertia('admins/hotels/index', [
            'hotels' => $hotels,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
            'hotel' => $hotel,
            'hotelOrganizerOptions' => $hotelOrganizerOptions,
        ]);
    }

    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        DB::beginTransaction();
        try {
            $hotel->update($request->validated());

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
