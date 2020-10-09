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
            error: ''
        };
    }

    validateEmail = (email) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;
        }
        return false;
    }

    validateZip = (zip) => {
        if (/(^\d{5}$)/.test(zip)) {
            return true;
        }
        return false;
    }

    validatePhone = (phone) => {
        if (/(^\d{10}$)/.test(phone)) {
            return true;
        }
        return false;
    }

    validateCard = (cardNum, cardExp) => {
        // can substitute plugin (ie stripe)
        return true;
    }

    validateExpiration = (cardExp) => {
        if (/(^\d{2}\/\d{2}$)/.test(cardExp)) {
            return true;
        }
        return false;
    }

    formError = (msg) => {
        this.setState({error: msg});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // clear any present error msg
        this.setState({error: ''});

        // validation
        const { customerInfo, itemInfo } = this.state;
        if (customerInfo.firstName.trim() === '') {
            this.formError('Please enter a valid first name.');
            return;
        } else if (customerInfo.firstName.trim().length > 50) {
            this.formError( 'First name must be shorter than 50 characters.');
            return;
        }
        if (customerInfo.lastName.trim() === '') {
            this.formError('Please enter a valid last name.');
            return;
        } else if (customerInfo.lastName.trim().length > 50) {
            this.formError('Last name must be shorter than 50 characters.');
            return;
        }
        if (customerInfo.email.trim() === '') {
            this.formError('Please enter a valid email address.');
            return;
        } else if (customerInfo.email.trim().length > 50) {
            this.formError('Email address must be shorter than 50 characters.');
            return;
        } else if (!this.validateEmail(customerInfo.email.trim())) {
            this.formError('Email address invalid.');
            return;
        }
        if (customerInfo.addressOne.trim() === '') {
            this.formError('Please enter a valid street address.');
            return;
        } else if (customerInfo.addressOne.trim().length > 60) {
            this.formError('Street address must be shorter than 60 characters.');
            return;
        }
        if (customerInfo.addressTwo.trim().length > 60) {
            this.formError('Second address field must be shorter than 60 characters.');
            return;
        }
        if (customerInfo.city.trim() === '') {
            this.formError('Please enter a valid city.');
            return;
        } else if (customerInfo.city.trim().length > 50) {
            this.formError('City must be shorter than 50 characters.');
            return;
        }
        if (customerInfo.state.trim() === '') {
            this.formError('Please enter a valid state.');
            return;
        } else if (customerInfo.state.trim().length > 50) {
            this.formError('State must be shorter than 50 characters.');
            return;
        }
        if (customerInfo.zip.trim().length !== 5 || 
            !this.validateZip(customerInfo.zip.trim())
        ) {
            this.formError('Please enter a valid zip code.');
            return;
        }
        if (customerInfo.phone.trim().length !== 10 || 
            !this.validatePhone(customerInfo.phone.trim())
        ) {
            this.formError('Please enter a valid phone number.');
            return;
        }
        if (customerInfo.cardNumber.trim() == '' || 
            customerInfo.cardNumber.trim().length > 20 || 
            !this.validateCard(customerInfo.cardNumber.trim())
            ) {
            this.formError('Please enter a valid credit card number.');
            return;
        }
        if (customerInfo.cardExpiration.trim().length > 20 || 
            !this.validateExpiration(customerInfo.cardExpiration.trim())
        ) {
            this.formError('Please enter a valid credit card expiration date.');
            return;
        }
        if (itemInfo.quantity > 3) {
            this.formError('Sorry, you can only purchase a maximum of 3 Magic Potion #1s.');
            return;
        } else if (itemInfo.quantity <= 0) {
            this.formError('Please enter a valid quantity.');
            return;
        }

        // request
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                firstName: customerInfo.firstName.trim(),
                lastName: customerInfo.lastName.trim(),
                email: customerInfo.email.trim(),
                address: {
                    street1: customerInfo.addressOne.trim(),
                    street2: customerInfo.addressTwo.trim(),
                    city: customerInfo.city.trim(),
                    state: customerInfo.state,
                    zip: customerInfo.zip.trim(),
                },
                phone: customerInfo.phone.trim(),
                quantity: itemInfo.quantity,
                total: itemInfo.total,
                payment: {
                    ccNum: customerInfo.cardNumber.trim(),
                    exp: customerInfo.cardExpiration.trim(),
                }
            })
        };

        fetch('http://localhost:8000/api/magic', requestOptions)
            .then(response => response.json())
            .then(data => this.handleSuccess(data.id))
            .catch(error => {
                alert(error);
            });
    }

    handleSuccess = (id) => {
        alert("Order #" + id + " has been placed!");
        this.setState({
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
            error: ''
        });
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

    renderError = () => {
        if (this.state.error) {
            return (
                <div className="error-msg">{this.state.error}</div>
            );
        }
        return <></>;
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit} className="magic-potion-container">
                <Item itemInfo={this.state.itemInfo} handleChange={this.handleItemInfoChange} />
                <Checkout 
                    customerInfo={this.state.customerInfo} 
                    handleChange={this.handleCustomerInfoChange}
                    renderError={this.renderError} 
                />
            </form>
        )
    }
}

export default MagicPotion 