<?php

namespace Tests\Feature\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PatchOrderTest extends TestCase
{
    /**
     * Test patch order by id success
     *
     * @return void
     */
    public function testPatchOrderSuccess()
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
            "id" => "1",
            "fulfilled" => true
        ];

        $this->json('patch', '/api/magic', $payload)
            ->assertStatus(200);
    }

    /**
     * Test patch order by id fail
     *
     * @return void
     */
    public function testPatchOrderFail()
    {
        $payload = [
            "id" => "1",
            "fulfilled" => true
        ];

        $this->json('patch', '/api/magic', $payload)
            ->assertStatus(404);
    }
}
