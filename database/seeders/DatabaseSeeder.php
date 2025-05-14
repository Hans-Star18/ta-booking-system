<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\stub\BedSeeder;
use Database\Seeders\stub\RoleSeeder;
use Database\Seeders\stub\RoomSeeder;
use Database\Seeders\stub\UserSeeder;
use Database\Seeders\stub\HotelSeeder;
use Database\Seeders\stub\AmenitySeeder;
use Database\Seeders\stub\PromotionCodeSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            BedSeeder::class,
            AmenitySeeder::class,
            HotelSeeder::class,
            RoomSeeder::class,
            PromotionCodeSeeder::class,
        ]);
    }
}
