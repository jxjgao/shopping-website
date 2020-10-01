import React, { Component } from 'react';

import classes from './Quantity.module.css';
import cx from 'classnames';
class Quantity extends Component {

  constructor(props) {
    super(props);

    this.state = {
        quantity: this.props.product.count, 
        disableDec: false, 
        disableInc: false
    }

    this.incrementHandler = this.incrementHandler.bind(this);
    this.decrementHandler = this.decrementHandler.bind(this);
  }

  componentDidUpdate(nextProps) {
    if(nextProps.product.count !== this.props.product.count){
      if (this.props.product.count > 0) {
        this.setState( { quantity: this.props.product.count, disableDec: false })
      }
    }
  }

  incrementHandler() {
    const addQuantity = this.state.quantity + 1;

    if (this.state.quantity < this.props.max){
      this.props.increment(this.props.product._id)  
      this.setState({quantity: addQuantity});
    }

    if (this.state.quantity === (this.props.max - 1)) {
      this.setState({disableInc: true});
    }
    if (this.state.quantity === this.props.min) {
      this.setState({disableDec: false});
    }
  }

  decrementHandler() {
    const removeQuantity = this.state.quantity - 1;

    if (this.state.quantity > this.props.min) {
      this.props.decrement(this.props.product._id)
      this.setState({quantity: removeQuantity });
    }

    if (this.state.quantity === this.props.min + 1) {
      this.setState({disableDec: true});
    }
    if (this.state.quantity === this.props.max) {
      this.setState({disableInc: false});
    }
  }

  render() {
    console.log('title', this.props.product.title, 'this.props.product.count', this.props.product.count, 'this.state.quantity:', this.state.quantity)
    const { disableDec, disableInc } = this.state;
    let disabledDec = disableDec ? classes.QuantityDisable : '';
    let disabledInc = disableInc ? classes.QuantityDisable : ''

    return (
      <span className={classes.QuantityPicker}>
        <button className={cx(classes.QuantityModifier, 
                                classes.LeftModifier,
                                disabledDec)} 
                                onClick={this.decrementHandler}>&ndash;</button>
        <input className={classes.QuantityDisplay} type="text" value={this.state.quantity} readOnly />
        <button className={cx(classes.QuantityModifier, 
                                classes.RightModifier,
                                disabledInc)} 
                                onClick={this.incrementHandler}>&#xff0b;</button>
      </span>
    );
  }
}


export default Quantity