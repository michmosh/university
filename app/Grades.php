<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grades extends Model
{
    //
    protected $fillable = ['class_name','class_id','student_id','grade'];
    protected $table = "grades";
    protected $primaryKey = 'student_id';

    public function users(){
        return $this->belongsTo('App\User' , 'id');
    }

    public function classes(){
        return $this->belongsTo('App\Classes','student_id');
    }
}
