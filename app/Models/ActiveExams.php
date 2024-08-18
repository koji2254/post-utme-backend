<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActiveExams extends Model
{
    use HasFactory;
    protected $fillable = [
        'exams_id',
        'exams_status',
        'user_id',
        'score',
        'allocated_time',
        'number_questions',
        'questions_set_id',
        'exam_type',
    ];
}
