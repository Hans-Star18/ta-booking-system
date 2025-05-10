<?php

namespace App\Http\Controllers\Organizer;

use App\Models\Bed;
use App\Models\Room;
use App\Models\Amenity;
use Illuminate\Http\Request;
use App\Traits\WithUploadFile;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Organizer\StoreRoomRequest;
use Carbon\Carbon;

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

    public function destroy(Room $room)
    {
        DB::beginTransaction();
        try {
            $room->amenities()->detach();
            $room->beds()->detach();
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
            $date = Carbon::parse($request->date);
            if ($date->isPast()) {
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
}
