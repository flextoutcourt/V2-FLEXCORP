<?php

namespace Database\Seeders\Api\Zikmu;

use App\Models\Api\Zikmu\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'admin',
            'password' => Hash::make('admin'),
            'email' => 'admin@dev.quentinleclerc.fr',
        ]);
    }
}