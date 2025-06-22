<?php

namespace Database\Seeders\stub;

use App\Models\Policy;
use Illuminate\Database\Seeder;

class PolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $policies = [
            [
                'name' => 'Refundable',
            ],
            [
                'name' => 'Smoking',
            ],
            [
                'name' => 'Pet',
            ],
        ];

        foreach ($policies as $policy) {
            Policy::create($policy);
        }
    }
}
