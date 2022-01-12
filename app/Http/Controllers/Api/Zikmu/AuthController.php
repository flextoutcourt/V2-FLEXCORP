<?php

namespace App\Http\Controllers\Api\Zikmu;

use App\Http\Controllers\Controller;
use App\Models\Api\Zikmu\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(Request $request){
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
        ]);

        //create token
        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'status' => true,
            'message' => 'registered successfully!',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ];
        return response($response,201);
    }

    public function login(Request $request){
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|confirmed'
        ]);
        //check email
        $user = User::where('email',$fields['email'])->first();
        //check password
        if(!$user || !Hash::check($fields['password'],$user->password)){
            return response(['status'=>false,'message'=>'invalid email or password'],401);
        }

        //create token
        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'status'=>true,
            'message'=>'Login successful!',
            'data' =>[
                'user' => $user,
                'token' => $token
            ]
        ];
        return response($response,201);
    }

    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        $response = [
            'status' => true,
            'message' => 'Logout successfully',
        ];
        return response($response,201);
    }

}
