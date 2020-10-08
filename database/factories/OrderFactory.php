<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'customer_id' => '1', 
            'card_number' => '1234',
            'card_expiration' => '5678',
            'quantity' => 3,
            'total' => 50.00,
            'fulfilled' => false
        ];
    }
}
