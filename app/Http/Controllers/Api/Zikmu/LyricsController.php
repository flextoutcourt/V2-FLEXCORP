<?php

namespace App\Http\Controllers;

use App\Models\Api\Zikmu\Lyrics;
use Illuminate\Http\Request;

class LyricsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        Lyrics::create([
            'spotify_id' => $request->spotify_id,
            'musixmatch_common_id' => $request->musixmatch_common_id,
            'content' => $request->content,
            'script' => $request->script,
        ]);

        return response('created', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Api\Zikmu\Lyrics  $lyrics
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        return Lyrics::where('spotify_id', $request->spotify_id)->findOr(function(){
            return response('No match found', 200);
        });
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Api\Zikmu\Lyrics  $lyrics
     * @return \Illuminate\Http\Response
     */
    public function edit(Lyrics $lyrics)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Api\Zikmu\Lyrics  $lyrics
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Lyrics $lyrics)
    {
        $lyrics->update([
            'spotify_id' => $request->spotify_id,
            'musixmatch_common_id' => $request->musixmatch_common_id,
            'content' => $request->content,
            'script' => $request->script,
        ]);
        return response('updated', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Api\Zikmu\Lyrics  $lyrics
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lyrics $lyrics)
    {
        $lyrics->delete();
        return response('deleted', 200);
    }
}
