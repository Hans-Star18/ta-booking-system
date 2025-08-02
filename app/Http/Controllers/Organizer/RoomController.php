<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\StoreRoomRequest;
use App\Http\Requests\Organizer\UpdateBatchAllotmentRequest;
use App\Http\Requests\Organizer\UpdateRoomRequest;
use App\Models\Amenity;
use App\Models\Bed;
use App\Models\PhotoRoom;
use App\Models\Policy;
use App\Models\Reservation;
use App\Models\Room;
use App\Traits\WithUploadFile;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class RoomController extends Controller
{
    use WithUploadFile;

    protected $hotel;

    public function __construct()
    {
        $this->hotel = auth()->guard('web')->user()->hotel;
    }

    public function index()
    {
        return inertia('organizers/rooms/index', [
            'rooms' => $this->hotel->rooms,
        ]);
    }

    public function create()
    {
        $beds      = Bed::all();
        $amenities = Amenity::all();
        $policies  = Policy::all();

        return inertia('organizers/rooms/add', [
            'beds'      => $beds,
            'amenities' => $amenities,
            'policies'  => $policies,
        ]);
    }

    public function store(StoreRoomRequest $request)
    {
        $validated             = $request->safe()->only(['name', 'max_occupancy', 'description', 'price']);
        $validated['hotel_id'] = $request->user()->hotel->id;

        DB::beginTransaction();
        try {
            $storedFileName = $this->storeFile($request->file('cover_image'), Room::FILE_PATH);
            if (! $storedFileName) {
                return back()->with('alert', [
                    'message' => 'Failed to store image',
                    'type'    => 'error',
                ]);
            }
            $validated['cover_image'] = $storedFileName;

            $room = Room::create($validated);

            $room->amenities()->attach($request->amenity_config);
            $room->beds()->attach($request->bed_config);
            $room->policies()->attach($request->policy_config);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error storing room: '.$th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to store room',
                'type'    => 'error',
            ]);
        }

        return to_route('organizer.rooms.index')->with('alert', [
            'message' => 'Room created successfully',
            'type'    => 'success',
        ]);
    }

    public function show(Room $room)
    {
        if ($room->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Room not found',
                'type'    => 'error',
            ]);
        }

        $onReservations = $room->roomReservations()
            ->with(['reservation.transaction'])
            ->whereHas('reservation', function ($query) {
                $query->whereIn('status', [Reservation::PENDING, Reservation::CONFIRMED])
                    ->whereHas('transaction');
            })
            ->get()
            ->flatMap(function ($roomReservation) {
                $reservation = $roomReservation->reservation;
                $dates       = [];

                for ($date = $reservation->check_in->copy(); $date->lt($reservation->check_out); $date->addDay()) {
                    $dates[] = [
                        'date'           => $date->format('Y-m-d'),
                        'allotment'      => $reservation->allotment,
                        'reservation_id' => $reservation->id,
                        'status'         => $reservation->status ?? 'pending',
                    ];
                }

                return $dates;
            })
            ->groupBy('date')
            ->map(function ($dateGroup) {
                return [
                    'date'            => $dateGroup->first()['date'],
                    'total_allotment' => $dateGroup->sum('allotment'),
                    'reservations'    => $dateGroup->map(function ($item) {
                        return [
                            'reservation_id' => $item['reservation_id'],
                            'allotment'      => $item['allotment'],
                            'status'         => $item['status'],
                        ];
                    }),
                ];
            })
            ->values();

        $allotments = $room->allotments->sortBy('date')->values()->map(function ($allotment) use ($onReservations) {
            $date            = $allotment->date;
            $reservationData = $onReservations->firstWhere('date', $date->format('Y-m-d'));

            $onRes     = $reservationData ? $reservationData['total_allotment'] : 0;
            $available = max(0, $allotment->allotment - $onRes); // Pastikan tidak negatif

            // Debug: Log perhitungan untuk setiap tanggal
            logger()->info("Date: {$date->format('Y-m-d')}, Allotment: {$allotment->allotment}, OnRes: {$onRes}, Available: {$available}");

            return [
                'id'           => $allotment->id,
                'date'         => $allotment->date,
                'allotment'    => $allotment->allotment,
                'onRes'        => $onRes,
                'available'    => $available,
                'reservations' => $reservationData ? $reservationData['reservations'] : [],
            ];
        })->toArray();

        return inertia('organizers/rooms/show', [
            'room'       => $room,
            'allotments' => $allotments,
        ]);
    }

    public function edit(Room $room)
    {
        if ($room->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Room not found',
                'type'    => 'error',
            ]);
        }

        $beds      = Bed::all();
        $amenities = Amenity::all();
        $policies  = Policy::all();

        return inertia('organizers/rooms/edit', [
            'room'      => $room,
            'beds'      => $beds,
            'amenities' => $amenities,
            'policies'  => $policies,
        ]);
    }

    public function update(Room $room, UpdateRoomRequest $request)
    {
        if ($room->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Room not found',
                'type'    => 'error',
            ]);
        }

        $validated             = $request->safe()->only(['name', 'max_occupancy', 'description', 'price', 'is_active']);
        $validated['hotel_id'] = $request->user()->hotel->id;

        DB::beginTransaction();
        try {
            if ($request->hasFile('cover_image')) {
                if ($room->cover_image) {
                    $this->deleteFile($room->cover_image);
                }

                $storedFileName = $this->storeFile($request->file('cover_image'), Room::FILE_PATH);
                if (! $storedFileName) {
                    return back()->with('alert', [
                        'message' => 'Failed to store image',
                        'type'    => 'error',
                    ]);
                }
                $validated['cover_image'] = $storedFileName;
            }

            $room->update($validated);
            $room->amenities()->sync($request->amenity_config);
            $room->beds()->sync($request->bed_config);
            $room->policies()->sync($request->policy_config);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error updating room: '.$th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update room',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Room updated successfully',
            'type'    => 'success',
        ]);
    }

    public function destroy(Room $room)
    {
        if ($room->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Room not found',
                'type'    => 'error',
            ]);
        }

        DB::beginTransaction();
        try {
            if ($room->roomReservations->isNotEmpty()) {
                return back()->with('alert', [
                    'message' => 'You can\'t delete this room because it has reservations. Please change the status to inactive to disable this room.',
                    'type'    => 'error',
                ]);
            }

            $this->deleteFile($room->cover_image);
            $room->delete();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error deleting room: '.$th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to delete room',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Room deleted successfully',
            'type'    => 'success',
        ]);
    }

    public function allotment(Room $room, Request $request)
    {
        if ($room->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Room not found',
                'type'    => 'error',
            ]);
        }

        DB::beginTransaction();
        try {
            $date = Carbon::parse($request->date)->timezone('Asia/Makassar');
            if ($date->isPast() && ! $date->isToday()) {
                return back()->with('alert', [
                    'message' => 'Cannot set allotment for past dates',
                    'type'    => 'error',
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
                    'date'    => $date->format('Y-m-d'),
                    'room_id' => $room->id,
                ], [
                    'allotment' => $request->allotment,
                ]);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error updating allotment: '.$th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update allotment',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Allotment updated successfully',
            'type'    => 'success',
        ]);
    }

    public function batchAllotment(Room $room, UpdateBatchAllotmentRequest $request)
    {
        if ($room->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Room not found',
                'type'    => 'error',
            ]);
        }

        DB::beginTransaction();
        try {
            $startDate = Carbon::parse($request->start_date)->timezone('Asia/Makassar');
            $endDate   = Carbon::parse($request->end_date)->timezone('Asia/Makassar');
            $allotment = $request->allotment;

            if ($startDate->gt($endDate)) {
                return back()->with('alert', [
                    'message' => 'Start date must not be after end date',
                    'type'    => 'error',
                ]);
            }

            for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
                if ($date->isPast() && ! $date->isToday()) {
                    continue;
                }

                $dateString = $date->format('Y-m-d');

                $existing = $room->allotments()->where('date', $dateString)->first();

                if ($existing && (blank($allotment) || $allotment == 0)) {
                    $existing->delete();
                } elseif (! blank($allotment) && $allotment > 0) {
                    $room->allotments()->updateOrCreate(
                        ['date' => $dateString, 'room_id' => $room->id],
                        ['allotment' => $allotment]
                    );
                }
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error updating batch allotment: '.$th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to update batch allotment',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Batch allotment updated successfully',
            'type'    => 'success',
        ]);
    }

    public function createPhoto(Room $room)
    {
        return inertia('organizers/rooms/stub/photo-management', [
            'room' => $room,
        ]);
    }

    public function storePhoto(Room $room, Request $request)
    {
        if ($room->hotel_id !== $this->hotel->id) {
            return back()->with('alert', [
                'message' => 'Room not found',
                'type'    => 'error',
            ]);
        }

        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'file' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);
            $validated['room_id'] = $room->id;

            $storedFileName = $this->storeFile($request->file('file'), PhotoRoom::FILE_PATH);
            if (! $storedFileName) {
                return response()->json([
                    'message' => 'Failed to store image',
                    'error'   => 'Failed to store image',
                ], Response::HTTP_BAD_REQUEST);
            }
            $validated['photo'] = $storedFileName;

            $room->photos()->create($validated);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error storing photo: '.$th->getMessage());

            return response()->json([
                'message' => 'Failed to store photo',
                'error'   => $th->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'message' => 'Photo stored successfully',
            'data'    => $room->photos,
        ], Response::HTTP_OK);
    }

    public function destroyPhoto(PhotoRoom $photo)
    {
        DB::beginTransaction();
        try {
            $this->deleteFile($photo->photo);
            $photo->delete();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Error deleting photo: '.$th->getMessage());

            return back()->with('alert', [
                'message' => 'Failed to delete photo',
                'type'    => 'error',
            ]);
        }

        return back()->with('alert', [
            'message' => 'Photo deleted successfully',
            'type'    => 'success',
        ]);
    }
}
