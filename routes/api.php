<?php

use Illuminate\Http\Request;

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
Route::post('login/', 'UserController@login');
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('users', 'UserController@getUsers');
    Route::get('classes', 'ClassesController@getAll');
    Route::post('classes', 'ClassesController@addNew');
    Route::post('grades', 'GradesController@addNew');
    Route::patch('grades/{id}', 'GradesController@update');
    Route::get('users/{id}', 'UserController@getUser');
    Route::post('logout', 'UserController@logout');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});