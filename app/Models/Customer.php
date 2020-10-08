<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';

    protected $fillable = [
        'first_name', 
        'last_name', 
        'email', 
        'street1', 
        'street2', 
        'city', 
        'state', 
        'zip', 
        'phone'
    ];

    public function orders() {
        return $this->hasMany('App\Models\Order');
    }
}
