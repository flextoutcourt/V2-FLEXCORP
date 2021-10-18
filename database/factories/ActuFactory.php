<?php

namespace Database\Factories;

use App\Models\Actu;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActuFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Actu::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::first()->id,
            'title' => $this->faker->title(),
            'content' => $this->faker->text(1000),
            'category_id' => rand(1, 5)
        ];
    }
}
