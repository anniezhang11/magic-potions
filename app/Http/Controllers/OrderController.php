<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\Customer;

class OrderController extends Controller
{
    // for the post order endpoint 
    public function store(Request $request)
    {
        $data = json_decode($request->getContent());

        $customer = DB::table('customers')
            ->where('first_name', '=', $data->firstName)
            ->where('last_name', '=', $data->lastName)
            ->where('street1', '=', $data->address->street1)
            ->where('street2', '=', $data->address->street2)
            ->where('zip', '=', $data->address->zip)
            ->latest()
            ->first();

        if ($customer !== null) {
            $totalQuantity = DB::table('orders')
                ->where('customer_id','=',$customer->id)
                ->whereMonth('created_at', date('n'))
                ->sum('quantity');

            if ($totalQuantity >= 3) {
                return response()->json(
                    ['error' => 'Sorry, your limit of 3 potions has already been met this month.'], 
                    409
                );
            } else if (($totalQuantity + $data->quantity) > 3) {
                $remaining = 3 - $totalQuantity;
                return response()->json(
                    ['error' => 'Sorry, you can only purchase '.$remaining.' more potions this month.'], 
                    409
                );
            }
        } else {
            if ($data->quantity > 3) {
                return response()->json(
                    ['error' => 'Sorry, you can only purchase 3 potions at a time.'], 
                    409
                );
            }
            $customer = Customer::create([
                'first_name' => $data->firstName, 
                'last_name' => $data->lastName, 
                'email' => $data->email, 
                'street1' => $data->address->street1,
                'street2' => $data->address->street2, 
                'city' => $data->address->city, 
                'state' => $data->address->state, 
                'zip' => $data->address->zip, 
                'phone' => $data->phone
            ]);
        }

        $order = Order::create([
			'customer_id' => $customer->id,
            'card_number' => $data->payment->ccNum,
            'card_expiration' => $data->payment->exp,
            'quantity' => $data->quantity,
            'total' => $data->total,
		]);

        return response()->json([
			'id' => $order->id,
		], 201);
    }

    // get order
    public function show($id)
    {
        $order = Order::findOrFail($id);
        $customer = Customer::where('id', '=', $order->customer_id)->first();
        return response()->json([
			"firstName" => $customer->first_name,
            "lastName" => $customer->last_name,
            "email" => $customer->email,
            "address" => [
                "street1" => $customer->street1,
                "street2" => $customer->street2,
                "city" => $customer->city,
                "state" => $customer->state,
                "zip" => $customer->zip,
            ],
            "phone" => $customer->phone,
            "payment" => [
                "ccNum" => $order->card_number,
                "exp" => $order->card_expiration,
            ],
            "quantity" => $order->quantity,
            "total" => $order->total,
            "orderDate" => $order->created_at,
            "fulfilled" => $order->fulfilled,
		], 200);
    }

    // patch order
    public function update(Request $request)
    {
        $data = json_decode($request->getContent());

        $order = Order::findOrFail($data->id);
        $order->fulfilled = $data->fulfilled;
        $order->save();

        return response(200);
    }

    // delete order
    public function delete($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response(200);
    }
}
