<?php

namespace Database\Seeders;

use Database\Seeders\stub\AmenitySeeder;
use Database\Seeders\stub\BedSeeder;
use Database\Seeders\stub\HotelSeeder;
use Database\Seeders\stub\PolicySeeder;
use Database\Seeders\stub\PromotionCodeSeeder;
use Database\Seeders\stub\RoleSeeder;
use Database\Seeders\stub\RoomSeeder;
use Database\Seeders\stub\SettingSeeder;
use Database\Seeders\stub\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            BedSeeder::class,
            AmenitySeeder::class,
            PolicySeeder::class,
            HotelSeeder::class,
            RoomSeeder::class,
            PromotionCodeSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
