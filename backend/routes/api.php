<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Post\UserPostController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/createpost', [UserPostController::class, 'create']);
Route::get('/posts', [UserPostController::class, 'index']);
Route::put('/posts/{id}', [UserPostController::class, 'update']);
Route::delete('/posts/{id}', [UserPostController::class, 'destroy']);

