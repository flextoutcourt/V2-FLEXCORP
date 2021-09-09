<?php

namespace App\Http\Controllers;

use App\Models\Illustrations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CKEditorController extends Controller
{
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
}
