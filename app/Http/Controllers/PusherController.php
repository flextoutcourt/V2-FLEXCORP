<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Pusher\Pusher;

class PusherController extends Controller
{
    public function auth(Request $request)
    {
        $pusher = new Pusher(env('PUSHER_APP_KEY'), env('PUSHER_APP_SECRET'), env('PUSHER_APP_ID'));
        $socket_id = $request->socket_id;
        $channel_name = $request->channel_name;
        return $pusher->socketAuth($channel_name, $socket_id, json_encode(['user_id' => Auth::user()->id, Auth::user()->id => Auth::user()]));
    }
}
