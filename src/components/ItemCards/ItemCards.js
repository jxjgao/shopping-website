import React, {Component} from 'react';

import Card from 'react-bootstrap/Card';
import classes from './ItemCards.module.css';
import Row from 'react-bootstrap/Row';

class ItemCards extends Component {
    render() {
        let elements = []
        //id: pos + 1
        this.props.productsList.map(product => 
            elements.push(
                <div className = {classes.Row}>
                    <Card className={classes.Card}>
                    <a href="#" onClick={()=> this.props.moreInfo(product._id)}>
                    <Card.Img 
                        className={classes.CardImage}
                        variant="top" 
                        src={product.image}
                        />
                    <Card.Body className={classes.CardBody}>
                        <Card.Title>{product.title}</Card.Title>
                        ${product.price}
                    </Card.Body>
                    </a>
                    </Card>
                </div>
            )
        );
   
    return (
        <div className={classes.ItemGroup}>
        <Row>
            {elements}
        </Row>
        </div>
    )}
};

export default ItemCards;