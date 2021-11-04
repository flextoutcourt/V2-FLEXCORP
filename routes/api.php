<?php

use App\Http\Controllers\ActuController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CKEditorController;
use App\Http\Controllers\DraftsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PresenceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TchatController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('get_user_status', function(){
    echo (Auth::check() ? true : false);
})->name('api.get_user_status');

Route::post('/ck_upload', [CKEditorController::class, 'upload_file'])->name('api.ckupload');
Route::post('/autosave', [CKEditorController::class, 'autosave'])->name('api.ckautosave');

Route::get('/users/get', [UserController::class, "get"])->name('api.get_users');
Route::get('/user/get', [UserController::class, 'get_one'])->name('api.user.get');

Route::get('/user/get_drafts/{user_id}', [DraftsController::class, 'get'])->name('api.get_drafts');

Route::get('/actus/get_categories', [CategoryController::class, 'list'])->name('api.get_categories');
Route::get('/user/get_actus', [ActuController::class, 'get'])->name('api.get_actus');

Route::get('/category/get', [CategoryController::class, "get"])->name('api.get_categories');
Route::post('/category/add', [CategoryController::class, "store"])->name('api.set_category');
Route::post('/category/add/{category_id}/{actu}', [CategoryController::class, 'set_category_id'])->name('api.set_category_id');

Route::post('/projects/add', [ProjectController::class, 'store'])->name('api.project.add');
Route::get('/projects/all/{id}', [ProjectController::class, 'get'])->name('api.get_projects');

Route::get('/actu/comment/{id}', [ActuController::class, 'comments'])->name('api.get_comments');

Route::post('/contact', [HomeController::class, 'contact_store'])->name('contact.post');

Route::get('/tweets', [HomeController::class, 'get_tweets'])->name('api.get_tweets');

Route::post('/translate/{query}', function($query){
    return __($query);
})->name('api.translates.lang');
