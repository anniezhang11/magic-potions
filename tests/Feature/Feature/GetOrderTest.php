<?php

namespace Tests\Feature\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetOrderTest extends TestCase
{
    /**
     * Test get order by id success
     *
     * @return void
     */
    public function testGetOrderSuccess()
    {
        $payload = [
            "firstName" => 'Bob',
            "lastName" => 'Smith',
            "email" => 'bob@smith.com',
            "address" => [
                "street1" => '123 Bob St.',
                "street2" => 'Apt 1',
                "city" => 'Bobville',
                "state" => "Smith",
                "zip" => '11111',
            ],
            "phone" => '1112223333',
            "payment" => [
                "ccNum" => '1234567812345678',
                "exp" => '08/22',
            ],
            "quantity" => 1,
            "total" => '49.99',
        ];

        $this->json('post', '/api/magic', $payload);

        $this->json('get', '/api/magic/1')
            ->assertStatus(200)
            ->assertJsonStructure([
                'firstName',
                'lastName',
                'email',
                'address',
                'phone',
                'payment',
                'quantity',
                'total',
                'orderDate',
                'fulfilled'
            ]);
    }

    /**
     * Test get order by id fail
     *
     * @return void
     */
    public function testGetOrderFail()
    {
        $this->json('get', '/api/magic/1')
            ->assertStatus(404);
    }
}
