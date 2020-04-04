<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
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
        //create admin user
        DB::table('users')->insert([
            'name' => 'admin',
            'email' =>'admin@gmail.com',
            'role' => 'admin',
            'password' => bcrypt('123456'),
            'api_token' => str_random(60),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
       foreach($users_array as $user){
        DB::table('users')->insert([
            'name' => $user,
            'email' => $user.'@gmail.com',
            'role' => 'student',
            'password' => bcrypt('123456'),
            'api_token' => str_random(60),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
       }
    }
}
