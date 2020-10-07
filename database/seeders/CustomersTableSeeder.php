<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CustomersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Customer::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few articles in our database:
        // TODO
        // for ($i = 0; $i < 50; $i++) {
        //     Customer::create([
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
