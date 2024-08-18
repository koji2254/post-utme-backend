<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionsSet extends Model
{
    use HasFactory;

    protected $fillable = [
        'questions_set_id',
        'questions_set'
    ];
}
