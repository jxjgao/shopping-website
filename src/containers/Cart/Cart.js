import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Axios from '../../axio-cart';
import CartSummary from '../../components/CartSummary/CartSummary';
import ContactData from './ContactData/ContactData';

class Cart extends Component {
    state = {
        cart: [],
        totalPrice: 0,
        viewingContactData: false,
        isLoaded: false
    }

    componentDidMount() {
        Axios.get('/cart/5f63e617b29b17b8d1f854a7/group-product')
            .then(res => res.data)
            .then (
                    (data) => {
                        this.setState({ cart: data[0], totalPrice: data[1], isLoaded: true })
                    })
    }

    checkoutCancelledHandler = () => {
        this.props.history.push('/cart');
        this.setState( { viewingContactData: false })
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/cart/contact-data');
        this.setState( { viewingContactData: true })
    }

    render() {        
        let CartPage =  <CartSummary
                            cart = {this.state.cart}
                            price = {this.state.totalPrice}
                            checkoutContinued={this.checkoutContinuedHandler}
                            />

        if (this.state.viewingContactData) {
            CartPage =  <Route 
                            path={this.props.match.path + '/contact-data'} 
                            render={(props) => (<ContactData 
                                                    cart={this.state.cart} 
                                                    price={this.state.totalPrice} 
                                                    checkoutCancelled={this.checkoutCancelledHandler}
                                                    {...props} />)} />
        }

        return (
            <div>
                {CartPage}
            </div>
        )
    }
}

export default Cart