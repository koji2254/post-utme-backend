<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActiveAnswers extends Model
{
    use HasFactory;

    protected $fillable = [
        'exams_id',
        'user_id',
        'correct_answer',
        'selected_answer',
        'answer_status',
        'question_id',
        'subject',
    ];
}
