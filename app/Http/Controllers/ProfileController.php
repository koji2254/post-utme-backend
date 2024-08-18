<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function updateProfile(Request $request) {
        $profileData = $request->validate([
            'name' => 'required',
            'user_id' => 'required',
            'email' => 'required',
            'phone' => 'nullable',
            'jamb_number' => 'nullable',
            'jamb_score' => 'nullable',
            'faculty' => 'nullable',
            'department' => 'nullable',
        ]);
    
        $profileExisted = Profile::where('user_id', $profileData['user_id'])->first();
    
        if(!$profileExisted) {
            Profile::create($profileData);
            return response()->json(['status' => 'true', 'message' => 'Profile Created', 'profile' => $profileData]);
        } else {
            $profileExisted->update($profileData);
            return response()->json(['status' => 'true', 'message' => 'Profile Updated', 'profile' => $profileExisted]);
        }
    }

    
    public function getProfile($user_id) {

        $profile = Profile::where('user_id', $user_id)->get()->first();

        return response()->json(['status' => 'true', 'message' => 'success', 'profile' => $profile]);
       
    }
    
    public function getProfileSlim() {

        // Get the authenticated user
        $user = auth()->user();

        // Ensure the user is authenticated
        if (!$user) {
            return response()->json(['status' => 'false', 'message' => 'User not authenticated'], 401);
        }

        $profile = Profile::where('user_id', $user)->get()->first();

        return response()->json(['status' => 'true', 'message' => 'success', 'profile' => $profile]);
       
    }


    
}
