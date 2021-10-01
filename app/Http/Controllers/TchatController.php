<?php

namespace App\Http\Controllers;

use App\Events\Tchat as EventsTchat;
use App\Models\Message;
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
        $message = new Message();
        $str = $this->is_link($request->input('message') ? $this->is_link($request->input('message')) : $request->input('message'));
        $message->message = $str;
        $message->link_preview = json_encode($request->input('response'));
        $message->user_id = Auth::user()->id;
        $message->save();
        event(new EventsTchat(Auth::user(), $str));

        return [];
    }

    public function is_link($message)
    {
        $re = '%(?:(https?|ftp)://)(\S+(:\S*)?@|\d{1,3}(?:\.\d{1,3}){3}|(?:(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)(\.(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)*(?:\.[a-z\x{00a1}-\x{ffff}]{2,6}))(:\d+)?(?:[^\s]*)%iu';

        return preg_replace_callback($re, function($matches){
            return "<a href='{$matches[1]}'>{$matches[2]}</a>";
        }, $message);
    }

    public function list()
    {
        $messages = Message::all();
        foreach($messages as $key => $message){
            $messages[$key]->user = $message->user()->get();
            $message->link_preview = json_decode($message->link_preview);
        }
        return $messages;
    }

}
