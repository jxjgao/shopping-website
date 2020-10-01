import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {getCart, getProduct, addToCart, removeFromCart} from '../../store/actions';

import CartSummary from '../../components/CartSummary/CartSummary';
import ContactData from './ContactData/ContactData';

const mapDispatchToProps = {getCart, getProduct, addToCart, removeFromCart}
const mapStateToProps = (state) => (
    {   
        products: state.products, 
        cart: state.cart,
        totalPrice: state.totalPrice,
        loading: state.loading, 
        error: state.error 
    }
);

const connector = connect(mapStateToProps, mapDispatchToProps);

class Cart extends Component {
    state = {
        localPrice: 0,
        viewingContactData: false
    }

    componentDidMount() {
        this.props.getProduct()
        this.props.getCart()
    }

    checkoutCancelledHandler = () => {
        this.props.history.push('/cart');
        this.setState( { viewingContactData: false })
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/cart/contact-data');
        this.setState( { viewingContactData: true })
    }

    checkoutGoBackHomeHandler = () => {
        this.props.history.push('/home');
    }

    decrementHandler = (id) => {
        this.props.removeFromCart(id, this.props.products)
    }

    incrementHandler = (id) => {
        this.props.addToCart(id, this.props.products)
    }

    render() { 
        let CartPage =  <CartSummary
                            cart = {this.props.cart}
                            price = {this.props.totalPrice}
                            checkoutContinued={this.checkoutContinuedHandler}
                            goBackHome = {this.checkoutGoBackHomeHandler}
                            increment = {this.incrementHandler}
                            decrement = {this.decrementHandler}
                            />
                            

        if (this.state.viewingContactData) {
            CartPage =  <Route 
                            path={this.props.match.path + '/contact-data'} 
                            render={(props) => (<ContactData 
                                                    cart={this.props.cart} 
                                                    price={this.props.totalPrice} 
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

export default connector(Cart)