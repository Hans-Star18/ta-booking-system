<?php

namespace Database\Seeders\stub;

use App\Models\Bed;
use App\Models\Room;
use App\Models\Amenity;
use App\Models\BedConfig;
use App\Models\AmenityConfig;
use App\Models\Policy;
use App\Models\PolicyConfig;
use Illuminate\Database\Seeder;
use Database\Seeders\Traits\CreateImage;

class RoomSeeder extends Seeder
{
    use CreateImage;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $beds = Bed::all();
        $amenities = Amenity::all();
        $policies = Policy::all();

        $rooms = [
            [
                'hotel_id' => 1,
                'name' => "Deluxe Room",
                'description' => "<p>This spacious room features a luxurious king-size bed, perfect for a restful night's sleep. Large windows allow natural light to flood the space, offering a stunning view of the surrounding landscape. Whether you're relaxing indoors or admiring the scenery, the room combines comfort and beauty to create an unforgettable stay.</p>
",
                'max_occupancy' => 5,
                'price' => 250000,
                'cover_image' => $this->createImage(Room::FILE_PATH),
            ],
            [
                'hotel_id' => 1,
                'name' => "Standard Room",
                'description' => "<p>This comfortable room offers all the basic amenities for a restful stay. With a spacious layout and modern decor, it provides a cozy space for travelers to unwind and recharge. Whether you're working or relaxing, the room ensures a comfortable and convenient experience.</p>
",
                'max_occupancy' => 4,
                'price' => 250000,
                'cover_image' => $this->createImage(Room::FILE_PATH),
            ],
            [
                'hotel_id' => 1,
                'name' => "Suite",
                'description' => "<p>This luxurious suite offers a separate living area and a private balcony, providing a comfortable and stylish space for travelers to unwind and enjoy their stay. Whether you're working or relaxing, the room ensures a comfortable and convenient experience.</p>
",
                'max_occupancy' => 4,
                'price' => 300000,
                'cover_image' => $this->createImage(Room::FILE_PATH),
            ],
            [
                'hotel_id' => 1,
                'name' => "Family Room",
                'description' => "<p>This spacious room is designed for families with children, offering a comfortable and cozy space for everyone to enjoy. The room features a comfortable king-size bed, a spacious living area, and a private balcony, providing a comfortable and convenient experience for families.</p>
",
                'max_occupancy' => 6,
                'price' => 500000,
                'cover_image' => $this->createImage(Room::FILE_PATH),
            ],
            [
                'hotel_id' => 1,
                'name' => "Single Room",
                'description' => "<p>This cozy room is perfect for solo travelers, offering a comfortable and convenient space for a restful stay. Whether you're working or relaxing, the room ensures a comfortable and convenient experience.</p>
",
                'max_occupancy' => 1,
                'price' => 200000,
                'cover_image' => $this->createImage(Room::FILE_PATH),
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

            foreach ($amenities as $amenity) {
                AmenityConfig::create([
                    'room_id' => $rm->id,
                    'amenity_id' => $amenity->id,
                ]);
            }

            foreach ($policies as $policy) {
                PolicyConfig::create([
                    'room_id' => $rm->id,
                    'policy_id' => $policy->id,
                ]);
            }
        }
    }
}
