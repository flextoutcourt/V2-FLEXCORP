<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Illustrations extends Model
{
    use HasFactory;

    protected $fillable = ['actu_id', 'path'];
}
