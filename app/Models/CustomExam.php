<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomExam extends Model
{
    use HasFactory;

    protected $fillable = [
        'exams_id',
        'user_id',
        'subject_one',
        'subject_two',
        'subject_three',
        'subject_four',
        'qty_one',
        'qty_two',
        'qty_three',
        'qty_four',
        'allocated_time',
    ];

}
