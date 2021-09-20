<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProjectController extends Controller
{

    public function get(int $id)
    {
        return Project::where('type', $id)->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Projects/Main');
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
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:2',
            'description' => 'required|min:4',
            'type' => 'required',
            'illustration' => 'required|image'
        ], [
            'title.required' => ':attribute est requis',
            'title.min' => ':attribute doit faire au minimum :min caractères',
            'description.required' => ':attribute est requise',
            'description.min' => ':attribute doit fait au minimum :min caractères',
            'type.required' => ':attribute est obligatoire',
            'illustration.required' => ':attribute est requise',
            'illustration.image' => ':attribute doit être une image valide',
        ], [
            'title' => 'Le titre',
            'description' => 'La description',
            'illustration' => "L'illustration",
            'type' => 'Le type',
        ]);

        if($validator->fails()){
            dd($validator->errors());
            return back()->with('errors', $validator->errors());
        }else{
            $path = '';
            if($request->hasFile('illustration')){
                if($request->file('illustration')->isValid()){
                    $path = $request->illustration->store('illustration');
                }
            }
            if($request->title){
                $category = new Project($request->all());
                $category->illustration = $path;
                $category->save();
            }
        }
        return redirect(route('projects'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }

    public function asc301()
    {
        return Inertia::render('Projects/Asc301');
    }

    public function perso()
    {
        return Inertia::render('Projects/Perso');
    }

    public function pro()
    {
        return Inertia::render('Projects/Pro');
    }
}
