<?php

namespace App\Http\Controllers\Auth;

use App\Models\SubjectCombination;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function getUser(Request $request) {
        
        return response()->json(Auth::user());
    }

    public function index(){
        return response()->json('data info');
    }

    // 
    // 
    public function signUpUser(Request $request){
        $formFields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);
    
        $random_id = random_int(1000000000, 9999999999);
    
        $user = User::create([
            'name' => $formFields['name'],
            'user_id' => $random_id,
            'email' => $formFields['email'],
            'password' => bcrypt($formFields['password'])
        ]);

        Profile::create([
            'name' => $formFields['name'],
            'email' => $formFields['email'],
            'user_id' => $random_id,
            'phone' => '',
            'jamb_number' => '',
            'jamb_score' => '',
            'faculty' => '',
            'department' => '',
            'subject_combination' => '',
        ]);

        SubjectCombination::create([
            'user_id' => $random_id,
            'subject_one' => 'ENGLISH LANGUAGE',
            'subject_two' => '',
            'subject_three' => '',
            'subject_four' => '',
        ]);
    
        $token = $user->createToken('myapptoken')->plainTextToken;
    
        $data = [
            'user' => $user,
            'token' => $token
        ];
    
        return response()->json(['user' => $data], 201);
    }

    public function signInUser(Request $request){
        $formFields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        // check email
        $user = User::where('email', $formFields['email'])->first();

        // check password
        if(!$user || !Hash::check($formFields['password'], $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Bad credentials'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $data = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json(['user' => $data, 200]);
    }

    // 
    // 
    // 
    public function signOutUser(Request $request){
        $user = $request->user();

        // Check if the user has a current access token
        if ($user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully'], 200);
        }

        return response()->json(['message' => 'No token found'], 401);
    }
}
