import React, { Component } from 'react'

class Checkout extends Component {
    constructor(props) {
        super(props);
        
    }

    render () {
        const { customerInfo, handleChange } = this.props;
        return (
            <div className="checkout-container col-md-6">
                <div className="section-header">Contact | Billing Information</div>
                <input 
                    name="firstName" 
                    type="text" 
                    value={customerInfo.firstName} 
                    onChange={handleChange} 
                    placeholder="First Name"
                />
                <input 
                    name="lastName" 
                    type="text" 
                    value={customerInfo.lastName} 
                    onChange={handleChange} 
                    placeholder="Last Name"
                />
                <input 
                    name="email" 
                    type="text" 
                    value={customerInfo.email} 
                    onChange={handleChange} 
                    placeholder="Email Address"
                />
                <input 
                    name="addressOne" 
                    type="text" 
                    value={customerInfo.addressOne} 
                    onChange={handleChange} 
                    placeholder="Address Line 1"
                />
                <input 
                    name="addressTwo" 
                    type="text" 
                    value={customerInfo.addressTwo} 
                    onChange={handleChange} 
                    placeholder="Address Line 2"
                />
                <input 
                    name="city" 
                    type="text" 
                    value={customerInfo.city} 
                    onChange={handleChange} 
                    placeholder="City"
                />
                <input 
                    name="state" 
                    type="text" 
                    value={customerInfo.state} 
                    onChange={handleChange} 
                    placeholder="State"
                />
                <input 
                    name="zip" 
                    type="text" 
                    value={customerInfo.zip} 
                    onChange={handleChange} 
                    placeholder="Zip Code"
                />
                <input 
                    name="phone" 
                    type="text" 
                    value={customerInfo.phone} 
                    onChange={handleChange} 
                    placeholder="Phone Number"
                />
                <input 
                    name="cardNumber" 
                    type="text" 
                    value={customerInfo.cardNumber} 
                    onChange={handleChange}
                    placeholder="Credit Card Number"
                />
                <input 
                    name="cardExpiration" 
                    type="text" 
                    value={customerInfo.cardExpiration} 
                    onChange={handleChange} 
                    placeholder="mm/yy"
                />
                <input type="submit" value="Submit" />
            </div>
        )
    }
}

export default Checkout 