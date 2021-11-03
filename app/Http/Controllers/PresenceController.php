<?php

namespace App\Http\Controllers;

use App\Events\PresenceEvent;
use App\Events\RemovePresenceEvent;
use App\Models\Presence;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PresenceController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function get_current()
    {
        $presence = Presence::all();
        $u = [];
        foreach($presence as $p){
            $u[] = User::where('id', $p->user_id)->first();
        }
        return array_unique($u);
    }

    public function remove_presence()
    {
        $presence = Presence::where('user_id', Auth::user()->id)->first();
        $presence->delete();

        event(new PresenceEvent(Auth::user(), 1));
        return Auth::user();
    }
    
    public function add_presence()
    {
        $presence = new Presence(['user_id' => Auth::user()->id]);
        $presence->save();

        event(new PresenceEvent(Auth::user(), 0));
        return Auth::user();
    }
}
