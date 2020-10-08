<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    
    protected $fillable = [
        'customer_id', 
        'card_number',
        'card_expiration',
        'quantity',
        'total',
        'fulfilled'
    ];

    public function customer() {
        return $this->belongsTo('App\Models\Customer');
    }
}
