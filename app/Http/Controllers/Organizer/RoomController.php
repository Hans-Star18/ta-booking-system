<?php

namespace App\Http\Controllers\Organizer;

use App\Models\Room;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::all();

        return inertia('organizers/rooms/index', [
            'rooms' => $rooms,
        ]);
    }

    public function add()
    {
        return inertia('organizers/rooms/add');
    }

    public function show(Room $room)
    {
        return inertia('organizers/rooms/show', [
            'room' => $room,
        ]);
    }
}
