<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\Drafts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryController extends Controller
{

    public function get()
    {
        return Category::all();
    }

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
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:2',
            'description' => 'required|min:4',
            'illustration' => 'required|image'
        ], [
            'title.required' => ':attribute est requis',
            'title.min' => ':attribute doit faire au minimum :min caractères',
            'description.required' => ':attribute est requise',
            'description.min' => ':attribute doit fait au minimum :min caractères',
            'illustration.required' => ':attribute est requise',
            'illustration.image' => ':attribute doit être une image valide',
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
                $category = new Category($request->all());
                $category->illustration = $path;
                $category->save();
            }
        }

        // return $category;

        // dd($request->file('illustration'));
        // $validated = $request->validated();
        // dd($validated);
        // return true;
        echo json_encode($category);
    }

    public function set_category_id(int $category_id, string $draft)
    {
        $draft = Drafts::find($draft);
        $draft->category_id = $category_id != 0 ? $category_id : null;
        $draft->save();
        return true;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
