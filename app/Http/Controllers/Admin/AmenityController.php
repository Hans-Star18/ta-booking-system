<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAmenityRequest;
use App\Http\Requests\Admin\UpdateAmenityRequest;
use App\Models\Amenity;
use Illuminate\Support\Facades\DB;

class AmenityController extends Controller
{
    public function index()
    {
        $amenities = Amenity::all();

        return inertia('admins/amenities/index', [
            'amenities' => $amenities,
        ]);
    }

    public function create()
    {
        return inertia('admins/amenities/add');
    }

    public function store(StoreAmenityRequest $request)
    {
        DB::beginTransaction();
        try {
            Amenity::create($request->validated());

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            logger()->error('Error storing amenity: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to store amenity',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.amenities.index')->with('alert', [
            'message' => 'Amenity stored successfully',
            'type'    => 'success',
        ]);
    }

    public function edit(Amenity $amenity)
    {
        return inertia('admins/amenities/edit', [
            'amenity' => $amenity,
        ]);
    }

    public function update(UpdateAmenityRequest $request, Amenity $amenity)
    {
        DB::beginTransaction();
        try {
            $amenity->update($request->validated());

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            logger()->error('Error updating amenity: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update amenity',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Amenity updated successfully',
            'type'    => 'success',
        ]);
    }

    public function destroy(Amenity $amenity)
    {
        DB::beginTransaction();
        try {
            $amenity->delete();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            logger()->error('Error deleting amenity: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to delete amenity',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.amenities.index')->with('alert', [
            'message' => 'Amenity deleted successfully',
            'type'    => 'success',
        ]);
    }
}
