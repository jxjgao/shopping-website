import React, {Component} from 'react';

import Card from 'react-bootstrap/Card';
import classes from './ItemCards.module.css';
import Row from 'react-bootstrap/Row';

class ItemCards extends Component {
    render() {
        let elements = []
        //id: pos + 1
        this.props.productsList.map(product => {
            elements.push(
                <div style={{
                    paddingTop: '30px',
                    paddingBottom: '30px',
                    paddingLeft: '30px',
                    paddingRight: '30px'
                }}>
                    <Card 
                    style={{
                        width: '20rem',
                        paddingBottom: '30px' 
                        }}>
                    <a href="javascript:void(0)" onClick={()=> this.props.moreInfo(product.id)}>
                    <Card.Img 
                        variant="top" 
                        src={product.image}
                        style={{
                            height: '300px',
                            paddingTop: '20px',
                            paddingLeft: '20px',
                            paddingRight: '20px'
                        }} 
                        />
                    <Card.Body style={{
                        paddingTop: '40px',
                        height: '190px',
                        
                        }}>
                        <Card.Title>{product.title}</Card.Title>
                        ${product.price}
                    </Card.Body>
                    </a>
                    </Card>
                </div>
            )
        });
   
    return (
        <div className={classes.Grid}>
            <Row>
                {elements}
            </Row>
        </div>
    )}
};

export default ItemCards;