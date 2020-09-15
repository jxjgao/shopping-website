import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';
import classes from './MoreInfo.module.css';

class MoreInfo extends Component {
    //props should have product object
    render() {
        return (
            <Aux>
                <h2 className={classes.Center}>{this.props.product.title}</h2>
                <img className={classes.Image}
                    src={this.props.product.image}/>
                <p className={classes.Center}>{this.props.product.description}</p>
                <p>${(this.props.product.price).toFixed(2)}</p>
                <Button 
                    btnType="Success"
                    clicked={() => this.props.addToCart(this.props.product.id, 'success')}>Add to Cart</Button>
            
                <Button 
                    btnType="Danger"
                    clicked={this.props.moreInfoCancel}>Cancel</Button>
            </Aux>
        );
    }
}

export default MoreInfo;
