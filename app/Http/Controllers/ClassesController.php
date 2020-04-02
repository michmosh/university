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
}
