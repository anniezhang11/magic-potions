<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few articles in our database:
        // TODO
        // for ($i = 0; $i < 50; $i++) {
        //     Order::create([
        //         'firstName' => $faker->name, 
        //         'lastName', 
        //         'email', 
        //         'address', 
        //         'city', 
        //         'state', 
        //         'zip', 
        //         'phone'
        //     ]);
        // }
    }
}
