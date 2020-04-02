<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Grades;

class GradesController extends Controller
{
    //
    public function addNew(Request $request){
       return Grades::create($request->all())->toJson(); 
    }

    public function update(Request $request, $id){
        return Grades::where('id',$id)
                        ->update(['grade'=> $request->get('grade')]);
    }
}
