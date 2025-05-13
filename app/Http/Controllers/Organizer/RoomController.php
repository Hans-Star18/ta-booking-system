<?php

namespace App\Http\Controllers\Organizer;

use Carbon\Carbon;
use App\Models\Bed;
use App\Models\Room;
use App\Models\Amenity;
use Illuminate\Http\Request;
use App\Traits\WithUploadFile;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Organizer\StoreRoomRequest;
use App\Http\Requests\Organizer\UpdateRoomRequest;
use App\Http\Requests\Organizer\UpdateBatchAllotmentRequest;

class RoomController extends Controller
{
    use WithUploadFile;

    public function index()
    {
        $rooms = Room::all();

        return inertia('organizers/rooms/index', [
            'rooms' => $rooms,
        ]);
    }

    public function create()
    {
        $beds = Bed::all();
        $amenities = Amenity::all();

        return inertia('organizers/rooms/add', [
            'beds' => $beds,
            'amenities' => $amenities,
        ]);
    }

    public function store(StoreRoomRequest $request)
    {
        $validated = $request->safe()->only(['name', 'max_occupancy', 'description', 'price']);
        $validated['hotel_id'] = $request->user()->hotel->id;

        DB::beginTransaction();
        try {
            $storedFileName = $this->storeFile($request->file('cover_image'), Room::FILE_PATH);
            if (!$storedFileName) {
                return back()->with('alert', [
                    'message' => 'Failed to store image',
                    'type' => 'error',
                ]);
            }
            $validated['cover_image'] = $storedFileName;

            $room = Room::create($validated);

            $room->amenities()->attach($request->amenities);
            $room->beds()->attach($request->beds);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error storing room: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to store room',
                'type' => 'error',
            ]);
        }

        return to_route('organizer.rooms.index')->with('alert', [
            'message' => 'Room created successfully',
            'type' => 'success',
        ]);
    }

    public function show(Room $room)
    {
        $allotments = $room->allotments->sortBy('date')->values()->toArray();

        return inertia('organizers/rooms/show', [
            'room' => $room,
            'allotments' => $allotments,
        ]);
    }

    public function edit(Room $room)
    {
        $beds = Bed::all();
        $amenities = Amenity::all();

        return inertia('organizers/rooms/edit', [
            'room' => $room,
            'beds' => $beds,
            'amenities' => $amenities,
        ]);
    }

    public function update(Room $room, UpdateRoomRequest $request)
    {
        $validated = $request->safe()->only(['name', 'max_occupancy', 'description', 'price']);
        $validated['hotel_id'] = $request->user()->hotel->id;

        DB::beginTransaction();
        try {
            if ($request->hasFile('cover_image')) {
                if ($room->cover_image) {
                    $this->deleteFile($room->cover_image);
                }

                $storedFileName = $this->storeFile($request->file('cover_image'), Room::FILE_PATH);
                if (!$storedFileName) {
                    return back()->with('alert', [
                        'message' => 'Failed to store image',
                        'type' => 'error',
                    ]);
                }
                $validated['cover_image'] = $storedFileName;
            }

            $room->update($validated);
            $room->amenities()->sync($request->amenity_config);
            $room->beds()->sync($request->bed_config);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error updating room: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update room',
                'type' => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Room updated successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(Room $room)
    {
        DB::beginTransaction();
        try {
            $this->deleteFile($room->cover_image);
            $room->delete();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error deleting room: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to delete room',
                'type' => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Room deleted successfully',
            'type' => 'success',
        ]);
    }

    public function allotment(Room $room, Request $request)
    {
        DB::beginTransaction();
        try {
            $date = Carbon::parse($request->date)->timezone('Asia/Makassar');
            if ($date->isPast() && !$date->isToday()) {
                return back()->with('alert', [
                    'message' => 'Cannot set allotment for past dates',
                    'type' => 'error',
                ]);
            }

            $existingAllotment = $room->allotments->where('date', $date->format('Y-m-d'))->first();
            if ($existingAllotment && (blank($request->allotment) || $request->allotment == 0)) {
                $existingAllotment->delete();
            } else {
                if (blank($request->allotment) || $request->allotment == 0) {
                    return;
                }

                $room->allotments()->updateOrCreate([
                    'date' => $date->format('Y-m-d'),
                    'room_id' => $room->id,
                ], [
                    'allotment' => $request->allotment,
                ]);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error updating allotment: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update allotment',
                'type' => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Allotment updated successfully',
            'type' => 'success',
        ]);
    }

    public function batchAllotment(Room $room, UpdateBatchAllotmentRequest $request)
    {
        DB::beginTransaction();
        try {
            $startDate = Carbon::parse($request->start_date)->timezone('Asia/Makassar');
            $endDate = Carbon::parse($request->end_date)->timezone('Asia/Makassar');
            $allotment = $request->allotment;

            if ($startDate->gt($endDate)) {
                return back()->with('alert', [
                    'message' => 'Start date must not be after end date',
                    'type' => 'error',
                ]);
            }

            for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
                if ($date->isPast() && !$date->isToday()) {
                    continue;
                }

                $dateString = $date->format('Y-m-d');

                $existing = $room->allotments()->where('date', $dateString)->first();

                if ($existing && (blank($allotment) || $allotment == 0)) {
                    $existing->delete();
                } elseif (!blank($allotment) && $allotment > 0) {
                    $room->allotments()->updateOrCreate(
                        ['date' => $dateString, 'room_id' => $room->id],
                        ['allotment' => $allotment]
                    );
                }
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error updating batch allotment: ' . $th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update batch allotment',
                'type' => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Batch allotment updated successfully',
            'type' => 'success',
        ]);
    }
}
