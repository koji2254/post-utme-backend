<?php

namespace App\Http\Controllers;

use App\Models\ActiveAnswers;
use App\Models\Answers;
use App\Models\CustomExam;
use App\Models\Subjects;
use App\Models\Questions;
use App\Models\ActiveExams;
use Illuminate\Http\Request;
use App\Models\SubjectCombination;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\File;

class ActiveExamsController extends Controller
{
    public function examStandardStep(Request $request) {

        $examData = $request->validate([
            'user_id' => 'required',
            'exam_type' => 'required'
        ]);
    
        $subject_combination = SubjectCombination::where('user_id', $request->user_id)->first();
    
        if (!$subject_combination) {
            return response()->json(['status' => 'false', 'message' => 'Subject combination not found'], 404);
        }
    
        $subject_one = public_path('QuestionsFolder/' . $subject_combination->subject_one . '.json');
        $subject_two = public_path('QuestionsFolder/' . $subject_combination->subject_two . '.json');
        $subject_three = public_path('QuestionsFolder/' . $subject_combination->subject_three . '.json');
        $subject_four = public_path('QuestionsFolder/' . $subject_combination->subject_four . '.json');
        $comprehension_path = public_path('QuestionsFolder/COMPREHENSION.json');
    
        $qty_one = 45;
        $qty_two = 40;
        $qty_three = 40;
        $qty_four = 40;
    
        // Generate a random ID for the exam
        $random_id = random_int(1000000000, 9999999999);
        

        $subjects = [
            ['file' => $subject_one, 'quantity' => $qty_one, 'name' => $subject_combination->subject_one],
            ['file' => $subject_two, 'quantity' => $qty_two, 'name' => $subject_combination->subject_two],
            ['file' => $subject_three, 'quantity' => $qty_three, 'name' => $subject_combination->subject_three],
            ['file' => $subject_four, 'quantity' => $qty_four, 'name' => $subject_combination->subject_four],
        ];

        // $comprehension_file = json_decode(public_path('QuestionsFolder/COMPREHENSION.json'));
        $comprehension_file = json_decode(File::get($comprehension_path), true);
        $comprehension_questions = $comprehension_file['comprehensions'];
        shuffle($comprehension_questions);
        $randCompre = array_slice($comprehension_questions, 0, 3);

        $firtsRandQuestions = [];
        
        # Loops throu and store the Questions in the Above Array
        foreach($randCompre as $randComp){
            if(isset($randComp['questions'])) {
                $firtsRandQuestions = array_merge($firtsRandQuestions, $randComp['questions']);
            }
        }
       

        $exam = [
            'exam_id' => $random_id,
            'questions' => [],
        ];
              
        foreach ($subjects as $subject) {
            if (File::exists($subject['file'])) {
                $questions_data = json_decode(File::get($subject['file']), true);
                
                // Ensure the correct format of the questions data
                if (isset($questions_data['questions']) && is_array($questions_data['questions'])) {
                    $questions = $questions_data['questions'];
                    shuffle($questions);
                    $selected_questions = array_slice($questions, 0, $subject['quantity']);

                    // Check if the subject name is "ENGLISH LANGUAGE"
                    if ($subject['name'] === 'ENGLISH LANGUAGE') {
                        // Prepend $firtsRandQuestions to $selected_questions
                        $selected_questions = array_merge($firtsRandQuestions, $selected_questions);
                    }
    
                    $exam['questions'][] = [
                        'subject' => $subject['name'],
                        'questions' => $selected_questions,
                    ];
                }
            }
        }
    
        $exam_json = json_encode($exam, JSON_PRETTY_PRINT);
        $file_path = public_path('ActiveExams/' . $random_id . '.json');
        File::put($file_path, $exam_json);
        
       $examData['questions_set_id'] = $exam_json;
        $examData['exams_id'] = $random_id; 
        $examData['allocated_time'] = 120; 
        $examData['number_questions'] = 180; 
        $examData['score'] = 0; 
        $examData['exams_status'] = 'active'; 
    
        $exam_details = ActiveExams::create($examData);

        $exam_details['questions'] = json_decode($exam_json, true);
    
        return response()->json(['status' => 'true', 'exam_details' => $exam_details]);
    }
    //*
    
    
    // - - - - - - ----------------------------------------------------------
    // - - - - - - ----------------------------------------------------------
    // GET EXAMS DETAILS
    // GET EXAMS DETAILS
    public function getActiveExams($user_id) {
        // Fetch the active exam for the user
        $exam = ActiveExams::where('user_id', $user_id)->where('exams_status', 'active')->first();

        if (!$exam) {
            return response()->json(['status' => 'false', 'message' => 'Active exam not found'], 404);
        }
    
    
        // Add the questions to the response
        $examDetails = [
            'id' => $exam->id,
            'exams_id' => $exam->exams_id,
            'exams_status' => $exam->exams_status,
            'user_id' => $exam->user_id,
            'score' => $exam->score,
            'allocated_time' => $exam->allocated_time,
            'exam_type' => $exam->exam_type,
            'number_questions' => $exam->number_questions,
            'created_at' => $exam->created_at,
            'updated_at' => $exam->updated_at,
            // 'questions' => json_decode(file_get_contents(public_path('/ActiveExams/' . $exam->exams_id . '.json')))
        ];
        
        $exam['questions_set_id'] = json_decode($exam->questions_set_id);
        $exam['questions'] = $exam->questions_set_id;

        if($exam->exam_type === 'custom') {
            $customExams = CustomExam::where('exams_id', $exam->exams_id)->get()->first();

            $exam = array_merge($exam->toArray(), $customExams->toArray());
        }
        

        return response()->json([
            'status' => 'true', 
            'exams_details' => $exam, 
           
        ]);
    }

    // **********************************************


    // examCustomStep 
    // examCustomStep
    public function examCustomStep(Request $request) {
        // Validate request
        $exam_data = $request->validate([
            'exam_type' => 'required',
            'user_id' => 'required',
            'allocated_time' => 'required'
        ]);
    
        // Generate a random exam ID
        $random_id = random_int(1000000000, 9999999999);
    
 
        $subjects = [
            'subject_one' => 'qty_one',
            'subject_two' => 'qty_two',
            'subject_three' => 'qty_three',
            'subject_four' => 'qty_four',
        ];
    
        $exam = [
            'exam_id' => $random_id,
            'questions' => [],
        ];
    
        foreach ($subjects as $subject => $qty) {
            $subject_name = $request->$subject;
            $quantity = $request->$qty;
    
            if ($subject_name && $quantity > 0) {
                $subject_file_path = public_path('/QuestionsFolder/' . $subject_name . '.json');
    
                if (File::exists($subject_file_path)) {
                    $questions_data = json_decode(File::get($subject_file_path), true);
                    
                    // Ensure the correct format of the questions data
                    if (isset($questions_data['questions']) && is_array($questions_data['questions'])) {
                        $questions = $questions_data['questions'];
                        shuffle($questions);
                        $selected_questions = array_slice($questions, 0, $quantity);
    
                        $exam['questions'][] = [
                            'subject' => $subject_name,
                            'questions' => $selected_questions,
                        ];
                    }
                }
            }
        }

        // Create a new active exam entry
        $newActive = ActiveExams::create([
            'user_id' => $request['user_id'],
            'exams_status' => 'active',
            'exams_id' => $random_id,
            'score' => 0,
            'allocated_time' => $request['allocated_time'],
            'number_questions' => 0,
            'exam_type' => $request['exam_type'],
            'questions_set_id' => json_encode($exam, JSON_PRETTY_PRINT),
        ]);
    
        // Create a new custom exam entry
        $newCustom = CustomExam::create([
            'user_id' => $request['user_id'],
            'exams_id' => $newActive['exams_id'],
            'subject_one' => $request['subject_one'] ?? '',
            'subject_two' => $request['subject_two'] ?? '',
            'subject_three' => $request['subject_three'] ?? '',
            'subject_four' => $request['subject_four'] ?? '',
            'qty_one' => $request['qty_one'] ?? 0,
            'qty_two' => $request['qty_two'] ?? 0,
            'qty_three' => $request['qty_three'] ?? 0,
            'qty_four' => $request['qty_four'] ?? 0,
            'allocated_time' => $request['allocated_time'],
        ]);
    
        $exam_json = json_encode($exam, JSON_PRETTY_PRINT);
        $file_path = public_path('ActiveExams/' . $random_id . '.json');
        File::put($file_path, $exam_json);

        $exam_details = array_merge($newActive->toArray(), $newCustom->toArray());
        $exam_details['questions'] = json_decode(file_get_contents($file_path), true);

    
        // Debugging: Return the exam structure in response
        return response()->json(['status' => 'true', 'exam_details' => $exam_details]);
    }


    
    // POST AN ACTIVE EXAMS ANSWER
    // POST AN ACTIVE EXAMS ANSWER
    public function postExamAnswer(Request $request){

        $answer_data = $request->validate([
            'user_id' => 'required',
            'exams_id' => 'required',
            'selected_answer' => 'required',
            'question_id' => 'required',
            'subject' => 'required',
        ]);

        $subjectQuestion = json_decode(file_get_contents(public_path('QuestionsFolder/' . $answer_data['subject'] . '.json')), true);

        if($answer_data['subject'] === 'ENGLISH LANGUAGE'){
            $subjectQuestion = json_decode(file_get_contents(public_path('QuestionsFolder/ENGLISH LANGUAGE CORRECTION.json')), true);
        }

         // Find the question with the given question_id
        $question_id = $answer_data['question_id'];
        $selected_answer = $answer_data['selected_answer'];
        $correct_answer = null;
        $answer_status = 0;

        foreach ($subjectQuestion['questions'] as $question) {
            if ($question['question_id'] == $question_id) {
                $correct_answer = $question['answer_value'];
                if ($selected_answer === $correct_answer) {
                    $answer_status = 1;
                }
                break;
            }
        }

        $updateAnswer = ActiveAnswers::updateOrCreate(
            [
                'user_id' => $answer_data['user_id'],
                'exams_id' => $answer_data['exams_id'],
                'question_id' => $question_id
            ],
            [
                'selected_answer' => $selected_answer,
                'answer_status' => $answer_status,
                'correct_answer' => $correct_answer,
                'allocated_time' => 120,
                'subject' => $answer_data['subject'],
            ]
        );

        $users_answers = ActiveAnswers::where('user_id', $answer_data['user_id'])
        ->where('exams_id', $answer_data['exams_id'])
        ->select('id', 'user_id', 'exams_id', 'question_id', 'selected_answer', 'subject')
        ->get();

        return response()->json(['status' => 'true','user_answers' => $users_answers]);

    }

    // GET ANSWERS HISTORY
    // GET ANSWERS HISTORY
    public function getUserActiveAnswers($exams_id){

        $users_answers = ActiveAnswers::where('exams_id', $exams_id)
        ->select('id', 'user_id', 'exams_id', 'question_id', 'selected_answer', 'subject')
        ->get();
        
        return response()->json(['status' => 'true','user_answers' => $users_answers]);
    }

    // END EXAMS
    // END EXAMS
    public function endExams(Request $request) {

        $examInfo = $request->validate([
            'user_id' => 'required',
            'exams_id' => 'required',
        ]);

        $activeExam = ActiveExams::where('exams_id', $examInfo['exams_id'])
            ->where('user_id', $examInfo['user_id'])
            ->get()->first();

        if(!$activeExam){
            return response()->json(['status' => false ,'message' => 'No active Exam Quit and start a new one'], 404);

        }    

       $selectedAnswers = ActiveAnswers::where('exams_id', $examInfo['exams_id'])->get();
        $score = 0;

       foreach($selectedAnswers as $answer){
            if($answer->answer_status === 1){
               $score++;   
            }
       }

       $activeExam->update(['exams_status' => 'not-active', 'score' => $score]);

       return response()->json(['status' => true,'user_answers' => $selectedAnswers, 'score' => $score, 'message' => 'Exam Submited check history for your score'],201);
    }

    
    // examsHistory
    // examsHistory
    public function examsHistory($user_id){

        $exams_history = ActiveExams::where('user_id', $user_id)->orderBy('created_at', 'desc')->get();

        return response()->json(['status' => 'true','examsHistory' => $exams_history]);        

    }


    //********************************************** */ 
    //********************************************** */ 
    public function customAnswersHistory($exams_id){

        $exam = ActiveExams::where('exams_id', $exams_id)->get()->first();
        
        if(!$exam){
            return response()->json(['status' => 'false','exam_details' => [], 'exam_id' => $exams_id]);        
        }

        $user_id = $exam->user_id;
        $answers_list = ActiveAnswers::where('exams_id', $exams_id)
            ->where('user_id', $user_id)
            ->get();
        
        $exam['answers'] = $answers_list;
        $exam['questions_set_id'] = json_decode($exam['questions_set_id']);

        if($exam->exam_type === 'standard'){
            $subsjectCombination = SubjectCombination::where('user_id', $user_id)->get()->first();

            $exam_details = array_merge($exam->toArray(), $subsjectCombination->toArray());

            return response()->json(['status' => 'true','exams_details' => $exam_details]);        

        }else if($exam->exam_type === 'custom') {
            $customDetails = CustomExam::where('exams_id', $exams_id)->get()->first();

            $exam_details = array_merge($exam->toArray(), $customDetails->toArray());

            return response()->json(['status' => 'true','exams_details' => $exam_details]); 
        }
    } 



}
