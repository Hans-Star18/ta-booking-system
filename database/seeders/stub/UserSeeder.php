<?php

namespace Database\Seeders\stub;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'role_id'  => 1,
                'name'     => 'Admin',
                'email'    => 'admin@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'role_id'  => 2,
                'name'     => 'Adam Smith',
                'email'    => 'adam.smith@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'role_id'  => 2,
                'name'     => 'Eve Johnson',
                'email'    => 'eve.johnson@example.com',
                'password' => bcrypt('password'),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
