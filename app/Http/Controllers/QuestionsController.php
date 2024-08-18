<?php

namespace App\Http\Controllers;

use App\Models\Answers;
use App\Models\Questions;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function createQuestion(Request $request) {

        // Validate the incoming request data
        $validatedData = $request->validate([
            'subject_id' => 'required',
            'subject' => 'required',
            'question_value' => 'required',
            'question_type' => 'required',
            'question_status' => 'required',
            'jointed_question' => 'required',
            'question_options' => 'required',
            'answer_value' => '',
            'question_img_url' => '',
        ]);

        $random_id = random_int(1000000000, 9999999999);
        $validatedData['question_id'] = $random_id;

        // Handle the file upload if present
        if ($request->hasFile('question_img_url')) {
            $file = $request->file('question_img_url');
            // $imagePath = $request->file('question_img_url')->store('question_images', '../../public');

            $fileName = $validatedData['question_id'] . '.' . $file->getClientOriginalExtension();

            $filePath = $file->move(public_path('question-images'), $fileName);

            // $validatedData['question_img_url'] = $imagePath;
            $validatedData['question_img_url'] = $filePath;
        }
        
        
        // Create the question using mass assignment
        $question = Questions::create($validatedData);
        
        $answer = [
            'answer_value' => $validatedData['answer_value'],
            'subject_id' => $validatedData['subject_id'],
            'question_id' => $validatedData['question_id'],
        ];


        Answers::create($answer);

        return response()->json([
            'message' => 'Question created successfully',
            'question' => $question,
            'answer' => $answer
        ], 201);
    }

    public function getQuestions($subject_id) {

        $questions = Questions::where('subject_id', $subject_id)->get();

        $answers = Answers::all();

       foreach($questions as $question) {
         
            foreach($answers as $answer) {

                $answer_value = $answer->where('question_id', $question->question_id);
                
                $answer = $answer_value;
            }

            // $answer_value = $answer->answer_value;


            $question['answer_value'] = $answer;
       }

        return response()->json([
            'status' => 'true',
            'message' => 'success',
            'questions' => $questions,
        ], 200);
    }

}
