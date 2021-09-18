<?php

use App\Http\Controllers\ActuController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CKEditorController;
use App\Http\Controllers\DraftsController;
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

Route::get('/user/get_drafts/{user_id}', [DraftsController::class, 'get'])->name('api.get_drafts');

Route::get('/user/get_actus', [ActuController::class, 'get'])->name('api.get_actus');

Route::get('/category/get', [CategoryController::class, "get"])->name('api.get_categories');
Route::post('/category/add', [CategoryController::class, "store"])->name('api.set_category');