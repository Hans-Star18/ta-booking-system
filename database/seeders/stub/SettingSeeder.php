<?php

namespace Database\Seeders\stub;

use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'hotel_id' => 1,
                'dp_percentage' => 50,
                'tax_percentage' => 10,
                'extra_bed_price' => 100000,
            ]
        ];

        foreach ($settings as $setting) {
            $setting = Setting::create($setting);
        }
    }
}
