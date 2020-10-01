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
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
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
                value: '',
                validation: {},
                valid: true
            },
            shippingMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {displayValue: 'Shipping Method'},
                        {value: 'standard', displayValue: 'Standard Shipping'},
                        {value: 'expedited', displayValue: 'Expedited Shipping'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            
        },
        formIsValid: false,
        isLoaded: true
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { isLoaded: false } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            //example country: Canada
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        //name, address, zipCode, country, email, paymentType, product, userID, price
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

        axios.post( '/order/create-order', order )
            .then( response => {
                this.setState( { isLoaded: true } );
                axios.put('/cart/5f63e617b29b17b8d1f854a7/clear-cart-by-user-id');
                this.props.history.push( '/home' );
            } )
            .catch( error => {
                this.setState( { isLoaded: true } );
            } );
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Primary" disabled={!this.state.formIsValid}>ORDER</Button>
                <Button btnType="Danger" onClick={this.props.checkoutCancelled}>CANCEL</Button>
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