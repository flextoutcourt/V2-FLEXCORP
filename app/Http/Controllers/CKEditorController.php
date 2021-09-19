<?php

namespace App\Http\Controllers;

use App\Http\Requests\CKEditorRequest;
use App\Models\Drafts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CKEditorController extends Controller
{

    private $title_regex = '/<h1( class="(.*?)")?>(.*?)<\/h1>/';

    public function upload_file(Request $request)
    {
        if($request->hasFile('upload')){
            $fileNameWithExtension = $request->file('upload')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);

            $extension = $request->file('upload')->getClientOriginalExtension();

            $fileNameToStore = $fileName.'_'.time().'.'.$extension;

            $request->file('upload')->storeAs('/public/actus/', $fileNameToStore);
            // $url = asset('storage/actus/'.$fileNameToStore); 
            $url = asset('storage/actus/'.$fileNameToStore);
            return response()->json(['fileName' => $fileNameToStore, 'uploaded'=> 1, 'url' => $url]);
        }
    }

    public function autosave(Request $request)
    {
        $title = $this->create_title($request->editor);
        $draft = Drafts::find($request->id);
        if($draft){
            $draft->title = $title;
            $draft->content = $request->editor;
            $draft->update();
        }else{
            $d = new Drafts();
            $d->draft_id = $request->id;
            $d->user_id = $request->user_id;
            $d->title = $title;
            $d->content = $request->editor;
            $d->save();
        }
    }
        

    public function save(CKEditorRequest $request){
        dd($request->validated());
    }

    private function create_title(string $content)
    {
        preg_match($this->title_regex, $content, $matches);
        return $matches[3];
    }
}
