import React, { Component } from 'react'

class Checkout extends Component {
    constructor(props) {
        super(props);
        
    }

    render () {
        const { customerInfo, handleChange, renderError } = this.props;
        return (
            <div className="checkout-container">
                <div className="section-header">Contact | Billing Information</div>
                <div className="input-row">
                    <input 
                        name="firstName" 
                        className="input-half"
                        type="text" 
                        value={customerInfo.firstName} 
                        onChange={handleChange} 
                        placeholder="First Name"
                    />
                    <input 
                        name="lastName" 
                        className="input-half"
                        type="text" 
                        value={customerInfo.lastName} 
                        onChange={handleChange} 
                        placeholder="Last Name"
                    />
                </div>
                <input 
                    name="addressOne" 
                    type="text" 
                    value={customerInfo.addressOne} 
                    onChange={handleChange} 
                    placeholder="Street Address"
                />
                <input 
                    name="addressTwo" 
                    type="text" 
                    value={customerInfo.addressTwo} 
                    onChange={handleChange} 
                    placeholder="Apt/Suite/Other"
                />
                <div className="input-row">
                    <input 
                        name="city" 
                        className="input-third"
                        type="text" 
                        value={customerInfo.city} 
                        onChange={handleChange} 
                        placeholder="City"
                    />
                    <select
                        name="state" 
                        className="input-third"
                        value={customerInfo.state} 
                        onChange={handleChange} 
                    >
                        <option value=""></option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <input 
                        name="zip" 
                        className="input-third"
                        type="text" 
                        value={customerInfo.zip} 
                        onChange={handleChange} 
                        placeholder="Zip Code"
                    />
                </div>
                <div className="input-row">
                    <input 
                        name="email" 
                        className="input-half"
                        type="email" 
                        value={customerInfo.email} 
                        onChange={handleChange} 
                        placeholder="Email Address"
                    />
                    <input 
                        name="phone" 
                        className="input-half"
                        type="text" 
                        value={customerInfo.phone} 
                        onChange={handleChange} 
                        placeholder="Phone Number (ex: 1234567890)"
                    />
                </div>
                <div className="input-row">
                    <input 
                        name="cardNumber" 
                        className="input-half"
                        type="text" 
                        value={customerInfo.cardNumber} 
                        onChange={handleChange}
                        placeholder="Credit Card Number"
                    />
                    <input 
                        name="cardExpiration" 
                        className="input-half"
                        type="text" 
                        value={customerInfo.cardExpiration} 
                        onChange={handleChange} 
                        placeholder="mm/yy"
                    />
                </div>
                {renderError()}
                <input className="submit-btn" type="submit" value="Submit" />
            </div>
        )
    }
}

export default Checkout 