import React, { Component } from 'react';

import classes from './Quantity.module.css';
import cx from 'classnames';
import Axios from '../../axio-cart';

class Quantity extends Component {

  constructor(props) {
    super(props);

    this.state = {
        value: this.props.product.count, 
        disableDec: false, 
        disableInc: false
    }

    this.incrementHandler = this.incrementHandler.bind(this);
    this.decrementHandler = this.decrementHandler.bind(this);
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  incrementHandler() {
    this.props.increment(this.props.product.price)
    this.increment()

  }

  decrementHandler() {
    this.props.decrement(this.props.product.price)
    this.decrement()
  }
  

  increment() {
    const plusState = this.state.value + 1;

    if (this.state.value < this.props.max){
      this.setState({value: plusState});
      this.setState({disable: false});
      Axios.put('/cart/add-to-cart', {productID: this.props.product._id, userID: '5f63e617b29b17b8d1f854a7'})
      
    }

    if (this.state.value === (this.props.max - 1)) {
      this.setState({disableInc: true});
    }
    if (this.state.value === this.props.min) {
      this.setState({disableDec: false});
    }
  }

  decrement() {
    const minusState = this.state.value - 1;

    if (this.state.value > this.props.min) {
      this.setState({value: minusState });
      Axios.put('/cart/remove-from-cart', {productID: this.props.product._id, userID: '5f63e617b29b17b8d1f854a7'})

      if (this.state.value === this.props.min + 1) {
        this.setState({disableDec: true});
      }
    } else {
      this.setState({value: this.props.min});
    }
    if (this.state.value === this.props.max) {
      this.setState({disableInc: false});
    }
  }

  render() {
    const { disableDec, disableInc } = this.state;
    let disabledDec = disableDec ? classes.QuantityDisable : '';
    let disabledInc = disableInc ? classes.QuantityDisable : ''

    return (
      <span className={classes.QuantityPicker}>
        <button className={cx(classes.QuantityModifier, 
                                classes.LeftModifier,
                                disabledDec)} 
                                onClick={() => this.decrementHandler()}>&ndash;</button>
        <input className={classes.QuantityDisplay} type="text" value={this.state.value} readOnly />
        <button className={cx(classes.QuantityModifier, 
                                classes.RightModifier,
                                disabledInc)} 
                                onClick={this.incrementHandler}>&#xff0b;</button>
      </span>
    );
  }
}


export default Quantity