<?php

namespace App\Models;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\MassPrunable;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory, MassPrunable;

    protected $fillable = ['user_id'];

    public function prunable()
    {
        return static::where('created_at', '<=', now()->subMinute());
    }
}
