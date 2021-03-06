<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Flex',
                'email' => 'quentin.leclercbte@gmail.com',
                'password' => Hash::make('123456789'),
                'role' => 'admin',
            ],
            [
                'name' => 'Geoffrey',
                'email' => 'geoffrey@test.com',
                'password' => Hash::make('123456789'),
                'role' => 'user'
            ],
            [
                'name' => 'Quentin',
                'email' => 'quentin@test.com',
                'password' => Hash::make('123456789'),
                'role' => 'user',
            ],
            [
                'name' => 'Remy',
                'email' => 'remy@test.com',
                'password' => Hash::make('123456789'),
                'role' => 'user',
            ],
            [
                'name' => 'Anton',
                'email' => 'anton@test.com',
                'password' => Hash::make('123456789'),
                'role' => 'user',
            ],
            [
                'name' => 'Régis',
                'email' => 'regis@test.com',
                'password' => Hash::make('123456789'),
                'role' => 'user',
            ],
        ];

        foreach($users as $key => $user){
            $user = new User($user);
            $user->save();
        }
    }
}
