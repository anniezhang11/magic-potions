<?php

namespace Tests\Feature\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteOrderTest extends TestCase
{
    /**
     * Test delete order by id success
     *
     * @return void
     */
    public function testDeleteOrderSuccess()
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

        $this->json('delete', '/api/magic/1')
            ->assertStatus(200);
    }

    /**
     * Test delete order by id fail
     *
     * @return void
     */
    public function testDeleteOrderFail()
    {
        $this->json('delete', '/api/magic/1')
            ->assertStatus(404);
    }
}
