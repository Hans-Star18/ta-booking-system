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

    public function add()
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
        return inertia('organizers/rooms/show', [
            'room' => $room,
        ]);
    }
}
