<?php

namespace App\Http\Controllers;

use App\Http\Requests\AvatarRequest;
use App\Http\Requests\User\Update;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{

    public function get(?int $offset = 0, ?int $limit = 15)
    {
        return User::take($limit)->skip($offset)->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Dashboard');
    }

    public function drafts()
    {
        return Inertia::render('Auth/Drafts');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($name)
    {
        dd(User::where('name', $name)->get()->first());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Inertia::render('Auth/Edit');
    }

    public function edit_picture($id)
    {
        return Inertia::render('Auth/EditPicture');
    }

    public function update_picture(AvatarRequest $request)
    {
        if($request->hasFile('illustration')){
            if($request->file('illustration')->isValid()){
                $filePath = time().'.'.$request->file('illustration')->extension();
                $img = Image::make($request->file('illustration')->path());
                $img->resize(1920, 1080, function($const){
                    $const->aspectRatio();
                })->save('users/'.$filePath);
                $path = $request->file('illustration')->move('users', $filePath);
                $user = User::find(Auth::user()->id);
                $user->avatar = $path;
                $user->save();
            }
        }
        return redirect()->route('dashboard');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Update $request,User $user)
    {
        if(!Hash::check($request->input('password'), $request->user()->password)){
            return back()->withErrors([
                'password' => 'Votre mot de passe ne correspond pas',
            ]);
        }

        $user = User::find($request->user()->id);
        $user->name = $request->validated()['name'];
        $user->email = $request->validated()['email'];

        $user->update();

        return redirect()->route('dashboard')->with('success', 'Vos informations ont bien été modifiées');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function isAdmin()
    {
        return Auth::user()['role'] == "admin";
    }
}
