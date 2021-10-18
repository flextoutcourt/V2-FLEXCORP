<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->get() as $item){
            $category = new Category();
            $category->title = $item['title'];
            $category->color = $item['color'];
            $category->save();
        }
    }

    public function get()
    {
        return [
            [
                'title' => 'HTML', 
                'color' => '#DD4B25',
            ],
            [
                'title' => 'CSS', 
                'color' => '#254BDD',
            ], 
            [
                'title' => 'JavaScript', 
                'color' => '#EFD81D',
            ], 
            [
                'title' => 'PHP', 
                'color' => '#8993be',
            ], 
            [
                'title' => 'Node JS', 
                'color' => '#026E00',
            ], 
            [
                'title' => 'React', 
                'color' => '#61dbfb',
            ], 
            [
                'title' => 'React Native', 
                'color' => '#61dbfb',
            ], 
            [
                'title' => 'Laravel', 
                'color' => '#fb503b',
            ],
            [
                'title' => 'Framework CSS',
                'color' => '#ff0'
            ]
        ];
    }
}
