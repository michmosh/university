<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    // class that represents classes in the university 
    // @class_name
    protected $table = "classes";
    protected $fillable = ['class_name'];
    public $incrementing = false;

    public function users(){
        return $this->belongsToMany('App\User')->withPivot('grades','student_id');
    }

    public function grades(){
        return $this->hasMany('App\Grades','student_id');
    }
}
