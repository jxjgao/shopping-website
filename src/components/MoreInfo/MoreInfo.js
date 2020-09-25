import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';
import classes from './MoreInfo.module.css';
import cx from 'classnames';

class MoreInfo extends Component {
    //props should have product object
    render() {
        return (
            <Aux>
                <h2 className={cx(classes.Center, classes.Title)}>{this.props.product.title}</h2>
                <img className={classes.Image}
                    src={this.props.product.image}/>
                <p className={classes.Description}>{this.props.product.description}</p>
                <p className={classes.Price}>${(this.props.product.price).toFixed(2)}</p>
                <div className={classes.Button}>
                    <Button btnType = "Primary"
                        clicked={() => this.props.addToCart(this.props.product._id)}>Add to Cart</Button>
                
                    <Button 
                        btnType = "Danger"
                        clicked={this.props.moreInfoCancel}>Cancel</Button>
                </div>
            </Aux>
        );
    }
}

export default MoreInfo;
