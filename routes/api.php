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
Route::get('users', 'UserController@getUsers');
Route::get('users/{id}', 'UserController@getUser');
Route::post('login/', 'UserController@login');
Route::get('classes', 'ClassesController@getAll');
Route::post('grades', 'GradesController@addNew');
Route::patch('grades/{id}', 'GradesController@update');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::group(['middleware' => ['web']], function () {
//     Route::post('grades', 'GradesController@addNew');
//     Route::patch('grades/{id}', 'GradesController@update');
//     Route::get('users', 'UserController@getUsers');
//     Route::get('users/{id}', 'UserController@getUser');
//     Route::get('classes', 'ClassesController@getAll');
// });