<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionsController;
use App\Http\Controllers\ActiveExamsController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


// Authorisation section 

Route::post('/sign-in', [AuthController::class, 'signInUser']);

Route::post('/sign-up', [AuthController::class, 'signUpUser']);


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'getUser']);

    Route::get('/profile', [ProfileController::class, 'getProfile']);

    Route::post('/sign-out', [AuthController::class, 'signOutUser']);

    Route::get('/profile', [ProfileController::class, 'userProfile']);
    
    Route::get('/all-subjects', [SubjectController::class, 'allSubjects']);
    Route::post('/upload-subject', [SubjectController::class, 'uploadSubject']);
    Route::put('/update-subject', [SubjectController::class, 'updateSubject']);
    Route::delete('/delete-subject/{subject_id}', [SubjectController::class, 'deleteSubject']);

    Route::post('/create-question', [QuestionsController::class, 'createQuestion']);
    Route::get('/get-questions/{subject_id}', [QuestionsController::class, 'getQuestions']);

    Route::post('/update-profile', [ProfileController::class, 'updateProfile']);
    Route::get('/get-profile/{user_id}', [ProfileController::class, 'getProfile']);

    Route::get('/get-profile', [ProfileController::class, 'getProfileSlim']);

    Route::post('/submit-combination', [SubjectController::class, 'subjectCombination']);
    Route::get('/get-subject-combination/{user_id}', [SubjectController::class, 'getSubjectCombination']);

    Route::post('/exam-step', [ActiveExamsController::class, 'examStandardStep']);
    Route::post('/set-custom-exams', [ActiveExamsController::class, 'examCustomStep']);

    // Route::get('/get-active-exams/{user_id}', [ActiveExamsController::class, 'getActiveExams']);

    // Route::post('post-exam-answer', [ActiveExamsController::class, 'postExamAnswer']);
    // Route::get('get-user-active-answers/{exam_id}', [ActiveExamsController::class, 'getUserActiveAnswers']);

    Route::post('end-exams', [ActiveExamsController::class, 'endExams']);

    Route::get('exams-history/{user_id}', [ActiveExamsController::class, 'examsHistory']);
    Route::get('exams-answers-history/{exams_id}', [ActiveExamsController::class, 'customAnswersHistory']);

});

    Route::get('/get-active-exams/{user_id}', [ActiveExamsController::class, 'getActiveExams']);

    Route::post('post-exam-answer', [ActiveExamsController::class, 'postExamAnswer']);
    Route::get('get-user-active-answers/{exam_id}', [ActiveExamsController::class, 'getUserActiveAnswers']);

    // Route::post('end-exams', [ActiveExamsController::class, 'endExams']);