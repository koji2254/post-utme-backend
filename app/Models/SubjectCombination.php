<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectCombination extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject_one',
        'subject_two',
        'subject_three',
        'subject_four',
    ];
}
