<?php

namespace App\Http\Controllers;

use App\Events\Tchat as EventsTchat;
use App\Models\Message;
use App\Models\Tchat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TchatController extends Controller
{

    public function __construct(){
        $this->middleware('auth');
    }

    public function index()
    {
        return Inertia::render('Tchat/Main');
    }

    public function message(Request $request)
    {
        event(new EventsTchat(Auth::user(), $request->input('message')));
        $message = new Message();
        $message->message = $request->input('message');
        $message->user_id = Auth::user()->id;
        $message->save();

        return [];
    }

    public function list()
    {
        $messages = Message::all();
        foreach($messages as $key => $message){
            $messages[$key]->user = $message->user()->get();
        }
        return $messages;
    }

}
