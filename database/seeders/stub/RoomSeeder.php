<?php

namespace Database\Seeders\stub;

use App\Models\Bed;
use App\Models\Room;
use App\Models\BedConfig;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $beds = Bed::all();

        $rooms = [
            [
                'hotel_id' => 1,
                'name' => "Deluxe Room",
                'description' => "A spacious room with a king-size bed and a beautiful view.",
                'max_occupancy' => 2,
                'price' => 150.00,
                'amenities' => json_encode(['Wi-Fi', 'TV', 'Mini Bar']),
                'cover_image' => 'images/rooms/deluxe_room.jpg',
            ],
            [
                'hotel_id' => 1,
                'name' => "Standard Room",
                'description' => "A comfortable room with all the basic amenities.",
                'max_occupancy' => 2,
                'price' => 100.00,
                'amenities' => json_encode(['Wi-Fi', 'TV']),
                'cover_image' => 'images/rooms/standard_room.jpg',
            ],
            [
                'hotel_id' => 1,
                'name' => "Suite",
                'description' => "A luxurious suite with a separate living area and a balcony.",
                'max_occupancy' => 4,
                'price' => 250.00,
                'amenities' => json_encode(['Wi-Fi', 'TV', 'Mini Bar', 'Balcony']),
                'cover_image' => 'images/rooms/suite.jpg',
            ],
            [
                'hotel_id' => 1,
                'name' => "Family Room",
                'description' => "A spacious room suitable for families with children.",
                'max_occupancy' => 4,
                'price' => 200.00,
                'amenities' => json_encode(['Wi-Fi', 'TV', 'Mini Bar']),
                'cover_image' => 'images/rooms/family_room.jpg',
            ],
            [
                'hotel_id' => 1,
                'name' => "Single Room",
                'description' => "A cozy room perfect for solo travelers.",
                'max_occupancy' => 1,
                'price' => 80.00,
                'amenities' => json_encode(['Wi-Fi', 'TV']),
                'cover_image' => 'images/rooms/single_room.jpg',
            ],
        ];

        foreach ($rooms as $room) {
            $rm = Room::create($room);

            foreach ($beds as $bed) {
                BedConfig::create([
                    'room_id' => $rm->id,
                    'bed_id' => $bed->id,
                ]);
            }
        }
    }
}
