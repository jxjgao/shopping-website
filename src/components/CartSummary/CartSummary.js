import React, {Component} from 'react';

import Button from '../UI/Button/Button';
import classes from './CartSummary.module.css';
import Quantity from '../Quantity/Quantity';

class CartSummary extends Component {
    render() {
    let elements = []

    if (this.props.cart.length === 0) {
        elements = "Cart is Empty"
    }
    console.log(this.props.cart)
    this.props.cart.map(product => {
        elements.push(
        <div>
            <div style={{
                width: '1200px',
                height: '150px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 3px #ccc',
                padding: '10px',
                margin: '10px auto',
                boxSizing: 'border-box'
            }}>
            <span>
                <img style={{
                    width: '10%',
                    height: '90%'
                    }}
                    src={product.image}
                    alt={'Image cannot be found'}/>
                <span style={{
                    position: 'relative',
                    bottom: '40px',
                    paddingLeft: '15px'
                }}><strong>{product.title}</strong></span>
                <span><Quantity min={0} max={99} product={product}/></span>
                <div style={{
                     position: 'relative',
                     bottom: '80px',
                     paddingLeft: '135px'
                }}>${(product.price).toFixed(2)}</div>

            </span>
        </div>
    </div>  
    )})                                     
    let subtotalField = <div style={{
                                    
                            }}>
                            Subtotal: ${this.props.price.toFixed(2)}
                        </div>
    
    let checkoutButton = <Button btnType="Success" clicked={this.props.checkoutContinued}>Checkout</Button>

    if (this.props.cart.length === 0) {
        subtotalField = null
    }

    return (
        <div className={classes.Cart}>
            {elements}
            {subtotalField}
            <div>
                {checkoutButton}
            </div>
        </div>
    )


    } 
}

export default CartSummary