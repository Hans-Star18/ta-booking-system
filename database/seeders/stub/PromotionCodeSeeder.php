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
        $promotions = [10, 15, 20, 25, 30, 35, 40, 50];

        foreach ($promotions as $promotionQuantity) {
            PromotionCode::create([
                'hotel_id'    => 1,
                'code'        => Str::upper(Str::random(5)),
                'discount'    => $promotionQuantity,
                'valid_until' => now()->addDays(30),
                'is_active'   => true,
            ]);

            PromotionCode::create([
                'hotel_id'    => 2,
                'code'        => Str::upper(Str::random(5)),
                'discount'    => $promotionQuantity,
                'valid_until' => now()->addDays(30),
                'is_active'   => true,
            ]);
        }
    }
}
