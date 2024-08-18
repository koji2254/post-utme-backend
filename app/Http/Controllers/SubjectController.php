<?php

namespace App\Http\Controllers;

use App\Models\SubjectCombination;
use App\Models\Subjects;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    
    public function allSubjects() {

        $allSubjects = Subjects::all();

        return response()->json(['status' => 'true', 'allSubjects' => $allSubjects]);
    }

    public function uploadSubject(Request $request) {
        $subjectData = $request->validate([
            'subject' => 'required',
        ]); 

        $random_id = random_int(1000000000, 9999999999);

        $subjectData['subject_id'] = $random_id;

        Subjects::create($subjectData);

        $allSubjects = Subjects::all();

       return response()->json(['status' => 'true', 'message' => 'Subject created', 'allSubjects' => $allSubjects]);

    }

    public function updateSubject(Request $request) {
        $subjectData = $request->validate([
            'subject' => 'required',
            'subject_id' => 'required'
        ]); 

        $subject = Subjects::where('subject_id', $subjectData['subject_id']);

        if(!$subject){
            return response()->json(['status' => 'false','message' => 'not found try again']);
        }

        $subject->update([
            'subject' => $request->input('subject')
        ]);

        $allSubjects = Subjects::all();

       return response()->json(['status' => 'true','message' => 'Subject Updated', 'allSubjects' => $allSubjects]);

    }

    public function deleteSubject($subject_id) {
        

        $subject = Subjects::where('subject_id', $subject_id);

        if(!$subject){
            return response()->json(['status' => 'false','message' => 'not found try again']);
        }

        $subject->delete();

        $allSubjects = Subjects::all();

       return response()->json(['status' => 'true','message' => 'Subject Deleted', 'allSubjects' => $allSubjects]);

    }

    public function subjectCombination(Request $request) {
        $combination = $request->validate([
            'user_id' => 'required',
            'subject_one' => '',
            'subject_two' => '',
            'subject_three' => '',
            'subject_four' => '',
        ]);

        $user_id = $request->input('user_id');

        $user = SubjectCombination::where('user_id', $user_id)->get()->first();

        if(!$user){
            $new_com = SubjectCombination::create($combination);
            
            return response()->json(['status' => 'true','message' => 'Combination Submited', 'combination' => $new_com]);

        }else {
            $user->update($combination);

            return response()->json(['status' => 'true','message' => 'Combination Updated', 'combination' => $combination]);
        }

    }

    public function getSubjectCombination($user_id) {
        $combination = SubjectCombination::where('user_id', $user_id)->get()->first();

        if(!$combination){
            return response()->json(['status' => 'true','message' => 'Update Combination', 'combination' => []]);
        }

        if($combination) {
            return response()->json(['status' => 'true','message' => 'Combination List', 'combination' => $combination]);
        }
    }

}
