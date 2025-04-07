<?php

namespace Database\Seeders\stub;

use App\Models\Bed;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $beds = [
            [
                'name' => 'Single Bed',
                'description' => 'A single bed is a bed that is designed to accommodate one person. It typically measures 39 inches (99 cm) wide and 75 inches (191 cm) long.',
                'capacity' => 1,
            ],
            [
                'name' => 'Double Bed',
                'description' => 'A double bed is a bed that is designed to accommodate two people. It typically measures 54 inches (137 cm) wide and 75 inches (191 cm) long.',
                'capacity' => 2,
            ],
            [
                'name' => 'Queen Bed',
                'description' => 'A queen bed is a larger bed that is designed to accommodate two people. It typically measures 60 inches (152 cm) wide and 80 inches (203 cm) long.',
                'capacity' => 2,
            ],
            [
                'name' => 'King Bed',
                'description' => 'A king bed is the largest standard size bed, designed to accommodate two people. It typically measures 76 inches (193 cm) wide and 80 inches (203 cm) long.',
                'capacity' => 2,
            ],
        ];

        foreach ($beds as $bed) {
            Bed::create($bed);
        }
    }
}
