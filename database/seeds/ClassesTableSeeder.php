<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
class ClassesTableSeeder extends Seeder
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
        //create admin user
        foreach($classes_array as $class){
            DB::table('classes')->insert([
                'class_name' => $class,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        }
    }
}
