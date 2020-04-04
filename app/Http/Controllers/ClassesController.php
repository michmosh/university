<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes;
class ClassesController extends Controller
{
    //
    public function getAll(){
        return Classes::all()->toJson();
    }

    public function addNew(Request $request){
        return Classes::create(['class_name' => $request->get('class_name')])->toJson();
    }
}
