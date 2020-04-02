<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(){
        echo 'index';
    }

    public function getUsers(Request $request ){
        return User::with('grades')->where('role','!=','admin')->get()->toJson();
    }
    public function getUser($id){
        return User::with('grades')->find($id)->toJson();
    }
    public function login(Request $request){
        $rules = array(
            'email'    => 'required|email', // make sure the email is an actual email
            'password' => 'required'
        );
        $this->validate($request,$rules);
        $user_data = array(
            'email'  => $request->get('email'),
            'password' => $request->get('password')
           );
        if(Auth::attempt($user_data)){
            $user = Auth::user();
            return response()->json([
                'success' => true,
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role'  => $user->role
            ]);
        }
        else{
            return ('fail');
        }
    }
}
