<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteAuthController extends Controller
{
    private $authorized = ['github', 'google', 'facebook'];

    public function providerRedirect(Request $request)
    {
        return Socialite::driver($request->provider)->redirect();
    }

    public function loginWith(Request $request)
    {
        if(!in_array($request->provider, $this->authorized)){
            return back();
        }
        try{
            $providerUser = Socialite::driver($request->provider)->user();
            $user = User::where('email', $providerUser->email)->first();
            if($user){
                Auth::login($user);
                return redirect()->route('dashboard');
            }else{
                $createUser = User::create([
                    'name' => $providerUser->name,
                    'email' => $providerUser->email,
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
