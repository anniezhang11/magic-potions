<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\Customer;

class OrderController extends Controller
{
    public function index()
    {
        return "hi";
    }

    public function store(Request $request)
    {
        $data = json_decode($request->getContent());

        $customer = DB::table('customers')
            ->where('first_name', '=', $data->firstName)
            ->where('last_name', '=', $data->lastName)
            ->where('address', '=', $data->address->street1.' '.$data->address->street2)
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
            $customer = Customer::create([
                'first_name' => $data->firstName, 
                'last_name' => $data->lastName, 
                'email' => $data->email, 
                'address' => $data->address->street1.' '.$data->address->street2, 
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
}
