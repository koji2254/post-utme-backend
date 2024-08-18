<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_value',
        'question_id',
        'subject',
        'question_type',
        'question_status',
        'question_options',
        'question_img_url',
        'question_jointed',
        'subject_id',
    ];
}
