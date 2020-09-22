import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axio-cart';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: ''
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: ''
            },
            paymentMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {displayValue: 'Payment Method'},
                        {value: 'visa/mc', displayValue: 'Visa/Mastercard'},
                        {value: 'debit', displayValue: 'Debit Card'}
                    ]
                },
                value: ''
            },
            shippingMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {displayValue: 'Shipping Method'},
                        {value: 'standard', displayValue: 'Standard Shipping - $12.00'},
                        {value: 'expedited', displayValue: 'Expedited Shipping - $25.00'}
                    ]
                },
                value: ''
            },
            
        },
        isLoaded: true
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { isLoaded: false } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        //name, address, zipCode, country, email, paymentType, product, userID, price
        console.log(formData)
        const order = {
            name: formData.name,
            address: formData.address,
            postalCode: formData.postalCode,
            country: formData.country,
            email: formData.email,
            paymentType: formData.paymentMethod,
            cart: this.props.cart,
            userID: '5f63e617b29b17b8d1f854a7',
            price: this.props.price,
            shippingMethod: formData.shippingMethod
        }

        axios.post( 'order/create-order', order )
            .then( response => {
                this.setState( { isLoaded: true } );
                axios.put('cart/5f63e617b29b17b8d1f854a7/clear-cart-by-user-id');
                this.props.history.push( '/home' );
            } )
            .catch( error => {
                this.setState( { isLoaded: true } );
            } );
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }
    

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">Order</Button>
                <Button btnType="Danger" clicked={this.props.checkoutCancelled}>Cancel</Button>
            </form>
        );
        if ( !this.state.isLoaded ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;