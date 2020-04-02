<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
class GradesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $classes_array = [
            "english",
            "math",
            "science",
            "law",
            "art"
        ];
        $users_array = [
            "moshe",
            "yossi",
            "dana",
            "yael",
            "vered",
            "lior",
            "yaron",
            "jack",
            "jizel"
        ];
        foreach($classes_array as $class){
            foreach($users_array as $user){
                DB::table('grades')->insert([
                    'class_name' => $class,
                    'class_id' => array_search($class , $classes_array) + 1,
                    'student_id' => array_search($user , $users_array) + 1,
                    'grade' => rand(0,100),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]);
            }
        }
    }
}
