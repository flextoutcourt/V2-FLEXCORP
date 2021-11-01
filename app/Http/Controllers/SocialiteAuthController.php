<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteAuthController extends Controller
{
    public function googleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function loginWithGoogle()
    {
        try{
            $googleUser = Socialite::driver('google')->user();
            $user = User::where('email', $googleUser->email)->first();

            if($user){
                Auth::login($user);
                return redirect()->route('dashboard');
            }else{
                $createUser = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'password' => encrypt('test@123'),
                    'avatar' => $googleUser->getAvatar(),
                ]);

                Auth::login($createUser);
                return redirect()->route('dashboard');
            }
        } catch(Exception $e){
            dd($e->getMessage());
        }
    }

    public function facebookRedirect()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function loginWithFacebook()
    {
        try{
            $facebookUser = Socialite::driver('facebook')->user();
            $user = User::where('email', $facebookUser->email)->first();
            if($user){
                Auth::login($user);
                return redirect()->route('dashboard');
            }else{
                $createUser = User::create([
                    'name' => $facebookUser->name,
                    'email' => $facebookUser->email,
                    'password' => encrypt('test@123')
                ]);

                Auth::login($createUser);
                return redirect()->route('dashboard');
            }
        } catch(Exception $e){
            dd($e->getMessage());
        }
    }

    public function githubRedirect()
    {
        return Socialite::driver('github')->redirect();
    }

    public function loginWithGithub()
    {
        try{
            $githubUser = Socialite::driver('github')->user();
            $user = User::where('email', $githubUser->email)->first();
            if($user){
                Auth::login($user);
                return redirect()->route('dashboard');
            }else{
                $createUser = User::create([
                    'name' => $githubUser->name,
                    'email' => $githubUser->email,
                    'password' => encrypt('test@123')
                ]);

                Auth::login($createUser);
                return redirect()->route('dashboard');
            }
        } catch(Exception $e){
            dd($e->getMessage());
        }
    }
}
