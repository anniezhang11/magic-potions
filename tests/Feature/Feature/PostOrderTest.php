<?php

namespace Tests\Feature\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostOrderTest extends TestCase
{
    /**
     * Test successful post order
     *
     * @return void
     */
    public function testOrderSuccessful()
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

        $this->json('post', '/api/magic', $payload)
            ->assertStatus(201)
            ->assertJsonStructure([
                'id'
            ]);
    }

    /**
     * Test order exceeding monthly limit
     *
     * @return void
     */
    public function testExceedLimit()
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
            "quantity" => 3,
            "total" => '199.96',
        ];

        $this->json('post', '/api/magic', $payload)
            ->assertStatus(409)
            ->assertJsonStructure([
                'error'
            ]);
    }

    /**
     * Test no initial orders over quantity 3
     *
     * @return void
     */
    public function testOrderTooLarge()
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
            "quantity" => 4,
            "total" => '199.96',
        ];

        $this->json('post', '/api/magic', $payload)
            ->assertStatus(409)
            ->assertJsonStructure([
                'error'
            ]);
    }
}
