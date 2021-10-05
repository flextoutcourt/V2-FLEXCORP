<?php

namespace App\Http\Controllers;

use App\Events\Tchat as EventsTchat;
use App\Models\Media;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;

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
        $validator = Validator::make([
            'message' => 'required|string'
        ],[
            'message.required' => ":attribute ne peut pas être vide",
            'message.string' => ':attribute doit être une chaine de caractères'
        ],
        [
            'message' => 'Votre message',
        ]);

        if($validator->fails()){
            return $validator;
        }else{
            $message = new Message();
            $str = $this->is_link($request->message) ?? $request->message;
            $message->message = $str;
            $message->link_preview = $request->response;
            $message->user_id = Auth::user()->id;
            $message->medias = $request->all()['files'];
            $message->save();
            event(new EventsTchat(Auth::user(), $str, $request->response, $request->all()['files']));
    
            return [];
        }
    }

    public function add_media(Request $request)
    {
        $validator = Validator::make([
            'file' => 'file',
        ], [
            'file.file' => 'Le format du fichier n\'est pas pris en compte',
        ]);

        if($validator->fails()){
            return $validator->errors();
        }else{
            if($request->hasFile('file')){
                if($request->file('file')->isValid()){
                    $filePath = time().$request->uuid.'.'.$request->file('file')->extension();
                    $img = Image::make($request->file('file')->path());
                    $img->resize(1920, 1080, function($const){
                        $const->aspectRatio();
                    })->save('tchat/'.$filePath);
                    $path = $request->file('file')->move('tchat', $filePath);

                    $media = new Media();
                    $media->save();
                    $media->user_id = Auth::user()['id'];
                    $media->content = $path->getPathname();
                    $media->short_code = '#flex#'.$media->id."#flex#";
                    $media->save();
                    return $media;
                }
            }
        }
    }

    public function delete_media(Request $request)
    {
        $media = Media::find($request->itemId);
        Media::find($request->itemId)->delete();
        return $media;
    }

    public function is_link($message)
    {
        $re = '#\b(([\w-]+://?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/)))#i';
        $str = $message;

        return preg_replace($re, "#$1", $str, 1);
        // return preg_replace_callback($re, function($matches){
        //     return "#{$matches[0]}";
        // }, $str);

    }

    public function list(Request $request)
    {
        $messages = Message::orderBy('created_at', 'desc')->skip($request->offset)->take(50)->get();
        foreach($messages as $key => $message){
            $messages[$key]->user = $message->user()->get();
            $message->link_preview = json_decode($message->link_preview);
        }
        return $messages;
    }

}
