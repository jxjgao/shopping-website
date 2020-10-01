import React, {Component} from 'react';

import Button from '../UI/Button/Button';
import classes from './CartSummary.module.css';
import Quantity from '../Quantity/Quantity';
import ShoppingBasket from '@material-ui/icons/ShoppingBasketRounded';
import Aux from '../../hoc/Aux/Aux';

class CartSummary extends Component {

    render() {
    let elements = []

    if (this.props.cart.length === 0) {
        elements =  <Aux>
                        <div className={classes.EmptyCartIcon}>
                            <ShoppingBasket style={{fontSize: '72px'}}/>
                        </div>
                        <div className= {classes.EmptyCartText}>
                            Your cart is empty
                        </div>
                        <div className= {classes.EmptyCartBtn}>
                            <Button btnType="Primary" clicked={this.props.goBackHome}>CONTINUE SHOPPING</Button>
                        </div>
                    </Aux>
    }
    this.props.cart.filter(product => product.count > 0)
                    .map(product => 
                                elements.push(
                                        <div className={classes.CartItem}>
                                            <span>
                                                <img className={classes.CartImage}
                                                    src={product.image}
                                                    alt='Not found'/>
                                                <span className={classes.CartTitle}><strong>{product.title}</strong></span>
                                                <div className={classes.CartPrice}>${(product.price).toFixed(2)}</div>
                                                <div className={classes.CartQuantity}><Quantity min={0} max={99} product={product} decrement={this.props.decrement} increment={this.props.increment}/></div>
                                
                                            </span>
                                        </div>
                                )
                                )        

    let subtotalField = <div>
                            Subtotal: ${(this.props.price).toFixed(2)}
                        </div>
    
    let checkoutButton = <div className={classes.Checkout}>
                            <Button btnType= "Primary" 
                                 clicked={this.props.checkoutContinued}>CHECKOUT</Button>
                         </div>

    if (this.props.cart.length === 0) {
        subtotalField = null
        checkoutButton = null
                            
    }

    return (
        <div className={classes.Cart}>
            {elements}
                {checkoutButton}
            <div className= {classes.Subtotal}>
                {subtotalField} 
            </div>
            
        </div>
    )


    } 
}

export default CartSummary