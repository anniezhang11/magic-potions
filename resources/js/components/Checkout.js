import React, { Component } from 'react'

class Checkout extends Component {
    constructor(props) {
        super(props);
        
    }

    render () {
        const { customerInfo, handleChange } = this.props;
        return (
            <div>
                <label>
                    First Name:
                    <input name="firstName" type="text" value={customerInfo.firstName} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input name="lastName" type="text" value={customerInfo.lastName} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input name="email" type="text" value={customerInfo.email} onChange={handleChange} />
                </label>
                <label>
                    Address Line 1:
                    <input name="addressOne" type="text" value={customerInfo.addressOne} onChange={handleChange} />
                </label>
                <label>
                    Address Line 2:
                    <input name="addressTwo" type="text" value={customerInfo.addressTwo} onChange={handleChange} />
                </label>
                <label>
                    City:
                    <input name="city" type="text" value={customerInfo.city} onChange={handleChange} />
                </label>
                <label>
                    State:
                    <input name="state" type="text" value={customerInfo.state} onChange={handleChange} />
                </label>
                <label>
                    Zip Code:
                    <input name="zip" type="text" value={customerInfo.zip} onChange={handleChange} />
                </label>
                <label>
                    Phone Number:
                    <input name="phone" type="text" value={customerInfo.phone} onChange={handleChange} />
                </label>
                <label>
                    Credit Card Number:
                    <input name="cardNumber" type="text" value={customerInfo.cardNumber} onChange={handleChange} />
                </label>
                <label>
                    Credit Card Expiration:
                    <input name="cardExpiration" type="text" value={customerInfo.cardExpiration} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </div>
        )
    }
}

export default Checkout 