<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

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

Route::post('magic', [OrderController::class, 'store']);
Route::get('magic/{id}', [OrderController::class, 'show']);
Route::patch('magic', [OrderController::class, 'update']);
Route::delete('magic/{id}', [OrderController::class, 'delete']);
