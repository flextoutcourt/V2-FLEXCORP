<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drafts extends Model
{
    use HasFactory;

    protected $fillable = ['draft_id', 'title', 'illustration', 'content'];

    protected $primaryKey = 'draft_id';

    public $incrementing = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
