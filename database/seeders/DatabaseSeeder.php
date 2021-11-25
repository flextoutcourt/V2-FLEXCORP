<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use Database\Seeders\Api\Zikmu\AuthSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            AuthSeeder::class,
        ]);

        \App\Models\Actu::factory()
            ->has(Comment::factory()->count(10))
            // ->for(User::factory()->count(1))
            ->count(10)
            ->create();
        // \App\Models\Project::factory()
        //     ->has(Comment::factory()->count(10))
        //     ->count(10)
        //     ->create();
        // \App\Models\User::factory(10)->create();
    }
}
