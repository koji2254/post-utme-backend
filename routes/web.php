<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('active-exam', function() {
    return view('ActiveExam');
});

Route::get('custom-exam/{userId}/{token}', function($userId, $token) {
    return view('ActiveCustom', ['userId' => $userId, 'token' => $token]);
});
// Route::get('custom-exam', function() {
//     return view('ActiveCustom');
// });


Route::get('custom-correction/{user_id}/{exam_id}/{token}', function($userId,$examId, $token) {
    return view('CustomCorrection', ['userId'=>$userId, 'examId' => $examId, 'token' => $token]);
});

// Route::get('standard-correction/{exam_id}/{token}', function() {
//     return view('StandardCorrection');
// });

// Route::get('custom-correction/{exam_id}', function() {
//     return view('CustomCorrection');
// });
