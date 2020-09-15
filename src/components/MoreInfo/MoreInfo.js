import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Button from 'react-bootstrap/Button';

class MoreInfo extends Component {
    //props should have product object
    render() {
        return (
            <Aux>
                <h2>{this.props.product.title}</h2>
                <p>{this.props.product.description}</p>
                <p>{this.props.product.price}</p>
                <div align="right"
                        style={{
                            paddingRight: '100px'
                    }}>
                    <span style={{
                                paddingRight: '20px'}}>
                        <Button 
                            variant="primary" 
                            onClick={() => this.props.addToCart(this.props.product.id)}>Add to Cart</Button>
                    </span>
                    <span>
                        <Button 
                            variant="danger" 
                            onClick={() => this.props.moreInfoCancel}>Cancel</Button>
                    </span>
                </div>
            </Aux>
        );
    }
}

export default MoreInfo;
