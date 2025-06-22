<?php

namespace Database\Seeders\stub;

use App\Models\Amenity;
use Illuminate\Database\Seeder;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = [
            [
                'name' => 'Wi-Fi',
            ],
            [
                'name' => 'TV',
            ],
            [
                'name' => 'Mini Bar',
            ],
            [
                'name' => 'Balcony',
            ],
            [
                'name' => 'Air Conditioning',
            ],
            [
                'name' => 'Room Service',
            ],
            [
                'name' => 'Swimming Pool',
            ],
            [
                'name' => 'Gym',
            ],
            [
                'name' => 'Parking',
            ],
            [
                'name' => 'Free Parking',
            ],
            [
                'name' => 'Breakfast',
            ],
            [
                'name' => 'Lunch',
            ],
            [
                'name' => 'Dinner',
            ],
            [
                'name' => 'Snack',
            ],

        ];

        foreach ($amenities as $amenity) {
            Amenity::create($amenity);
        }
    }
}
