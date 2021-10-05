<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Tchat implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $auth;
    public $message;
    public $link_preview;
    public $medias;

    public function __construct($auth, $message, $link_preview, $medias)
    {
        $this->auth = $auth;
        $this->message = $message;
        $this->link_preview = $link_preview;
        $this->medias = $medias;
    }

    public function broadcastOn()
    {
        return ['chat'];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}
