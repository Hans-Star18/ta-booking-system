<?php

namespace Database\Seeders\stub;

use App\Models\PromotionCode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PromotionCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $promotionQuantities = 10;

        for ($i = 0; $i < $promotionQuantities; $i++) {
            PromotionCode::create([
                'hotel_id'    => 1,
                'code'        => Str::upper(Str::random(5)),
                'discount'    => rand(1, 100),
                'valid_until' => now()->addDays(30),
                'is_active'   => true,
            ]);

            PromotionCode::create([
                'hotel_id'    => 2,
                'code'        => Str::upper(Str::random(5)),
                'discount'    => rand(1, 100),
                'valid_until' => now()->addDays(30),
                'is_active'   => true,
            ]);
        }
    }
}
