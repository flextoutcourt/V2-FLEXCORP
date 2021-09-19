<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'illustration'];

    public function actus()
    {
        return $this->hasMany(Actu::class);
    }

    public function drafts()
    {
        return $this->hasMany(Category::class);
    }
}
