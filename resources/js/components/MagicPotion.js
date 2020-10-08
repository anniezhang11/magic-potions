import React, { Component } from 'react'
import Checkout from './Checkout'
import Item from './Item'

class MagicPotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerInfo: {
                firstName: '',
                lastName: '',
                email: '',
                addressOne: '',
                addressTwo: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
                cardNumber: '',
                cardExpiration: '',
            },
            itemInfo: {
                quantity: 0,
                total: '00.00',
            },
            response: ''
        };
    }

    handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: this.state.customerInfo.firstName,
                lastName: this.state.customerInfo.lastName,
                email: this.state.customerInfo.email,
                address: {
                    street1: this.state.customerInfo.addressOne,
                    street2: this.state.customerInfo.addressTwo,
                    city: this.state.customerInfo.city,
                    state: this.state.customerInfo.state,
                    zip: this.state.customerInfo.zip,
                },
                phone: this.state.customerInfo.phone,
                quantity: this.state.itemInfo.quantity,
                total: this.state.itemInfo.total,
                payment: {
                    ccNum: this.state.customerInfo.cardNumber,
                    exp: this.state.customerInfo.cardExpiration,
                }
            })
        };
        fetch('http://localhost:8000/api/magic', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => {
                console.error('There was an error!', error);
            });

        event.preventDefault();
    }

    handleItemInfoChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let newItemInfo;
        if (name === 'quantity') {
            const total = value * 49.99;
            newItemInfo = { ...this.state.itemInfo, ...{quantity: value, total}};
        } else {
            newItemInfo = { ...this.state.itemInfo, ...{[name]: value}};
        }
        
        this.setState({
            itemInfo: newItemInfo
        });
    }

    handleCustomerInfoChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const newCustomerInfo = { ...this.state.customerInfo, ...{[name]: value}};
        this.setState({
            customerInfo: newCustomerInfo
        });
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit} className="magic-potion-container">
                <Item itemInfo={this.state.itemInfo} handleChange={this.handleItemInfoChange} />
                <Checkout customerInfo={this.state.customerInfo} handleChange={this.handleCustomerInfoChange} />
            </form>
        )
    }
}

export default MagicPotion 