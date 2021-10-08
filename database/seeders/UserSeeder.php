<?php

namespace Database\Seeders;

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
                'admin' => 1,
            ],
            [
                'name' => 'Geoffrey',
                'email' => 'geoffrey@test.com',
                'password' => Hash::make('123456789'),
                'admin' => 0
            ],
            [
                'name' => 'Quentin',
                'email' => 'quentin@test.com',
                'password' => Hash::make('123456789'),
                'admin' => 0,
            ],
            [
                'name' => 'Remy',
                'email' => 'remy@test.com',
                'password' => Hash::make('123456789'),
                'admin' => 0,
            ],
            [
                'name' => 'Anton',
                'email' => 'anton@test.com',
                'password' => Hash::make('123456789'),
                'admin' => 0,
            ]
        ];

        foreach($users as $key => $user){
            DB::table('users')->insert([
                'name' => $user['name'],
                'email' => $user['email'],
                'email_verified_at' => date('Y-m-d H:i:s'),
                'password' => $user['password'],
                'admin' => $user['admin']
            ]);
        }
    }
}
