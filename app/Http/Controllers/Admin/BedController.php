<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBedRequest;
use App\Http\Requests\Admin\UpdateBedRequest;
use App\Models\Bed;
use Illuminate\Support\Facades\DB;

class BedController extends Controller
{
    public function index()
    {
        $beds = Bed::orderBy('created_at', 'desc')->get();

        return inertia('admins/beds/index', [
            'beds' => $beds,
        ]);
    }

    public function create()
    {
        return inertia('admins/beds/add');
    }

    public function store(StoreBedRequest $request)
    {
        DB::beginTransaction();
        try {
            Bed::create($request->validated());

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error add bed: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to add bed',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.beds.index')->with('alert', [
            'message' => 'Bed add successfully',
            'type'    => 'success',
        ]);
    }

    public function edit(Bed $bed)
    {
        return inertia('admins/beds/edit', [
            'bed' => $bed,
        ]);
    }

    public function update(UpdateBedRequest $request, Bed $bed)
    {
        DB::beginTransaction();
        try {
            $bed->update($request->validated());

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            logger()->error('Error updating bed: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update bed',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Bed updated successfully',
            'type'    => 'success',
        ]);
    }

    public function destroy(Bed $bed)
    {
        DB::beginTransaction();
        try {
            $bed->delete();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            logger()->error('Error deleting bed: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to delete bed',
                'type'    => 'error',
            ]);
        }

        return to_route('admin.beds.index')->with('alert', [
            'message' => 'Bed deleted successfully',
            'type'    => 'success',
        ]);
    }
}
