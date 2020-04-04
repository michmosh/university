<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\User;

use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private $api_token;
    public function __construct(){
        $this->api_token = str_random(60);
    }
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
            $login = $user->update(['api_token'=>$this->api_token]);
            if($login){
                return response()->json([
                    'success' => true,
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role'  => $user->role,
                    'api_token' => $this->api_token
                ]);
            }
            
        }
        else{
            return ('fail');
        }
    }
    public function logout(Request $request){
        $token = $request->header('Authorization');
        if (Str::startsWith($token, 'Bearer ')) {
            $token = Str::substr($token, 7);
        }
        $user = User::where('api_token',$token)->first();
        if($user) {
            $logout = User::where('id',$user->id)->update( ['api_token' => null]);
            if($logout){
                return response()->json([
                    'success' => true,
                    'message' => 'loggedOut',
                  ]);
          
            }
        }
        
    }
}
