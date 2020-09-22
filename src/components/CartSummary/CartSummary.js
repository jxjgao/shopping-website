import React, {Component} from 'react';

import Button from '../UI/Button/Button';

class CartSummary extends Component {
    render() {
        console.log(this.props.cart)
    let elements = []

    if (this.props.cart.length === 0) {
        elements = "Cart is Empty"
    }

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
                <span>Qty: {product.count}</span>
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
        <div>
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