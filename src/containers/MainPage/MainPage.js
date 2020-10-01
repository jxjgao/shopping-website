import React, {Component} from 'react';
import {store} from 'react-notifications-component';
import {connect} from 'react-redux';
import {getProduct, addToCart} from '../../store/actions';

import axios from '../../axio-cart';
import ItemCards from '../../components/ItemCards/ItemCards.js';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import MoreInfo from '../../components/MoreInfo/MoreInfo';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const mapDispatchToProps = {getProduct, addToCart}
const mapStateToProps = (state) => (
    {   
        products: state.products, 
        cart: state.cart,
        cartLoading: state.cartLoading,
        loading: state.loading, 
        error: state.error 
    }
);
//this is received as a prop
const connector = connect(mapStateToProps, mapDispatchToProps);

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            viewingMoreInfo: false,
            currentViewingProductId: 0,
        }

        this.createNotification = this.createNotification.bind(this);
    }

    componentDidMount() {
        this.props.getProduct()
    }

    addToCartHandler = (id, type) => {
        //returns product object with specified id
        this.props.addToCart(id, this.props.products);
        this.createNotification(type);

    }

    moreInfoClickHandler = (id) => {
        this.setState({viewingMoreInfo: true, currentViewingProductId: id});
    }

    moreInfoCancelHandler = () => {
        this.setState({viewingMoreInfo: false})
    }
 
    createNotification = () => {
        store.addNotification({
            title: 'Added to Cart',
            message: 'Item Successfully Added to Cart',
            type: 'success',                         // 'default', 'success', 'info', 'warning'
            container: 'top-right',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 5000
            }
          })
    }

    render() {
        let mainPageDisplay =  <ItemCards 
                                productsList={this.props.products} 
                                moreInfo={this.moreInfoClickHandler}
                                />

        if (this.props.loading) {
            mainPageDisplay = <Spinner />
        }

        let moreInfoSummary = null;

        if (this.state.currentViewingProductId !== 0) {
            moreInfoSummary = (
            <MoreInfo
                addToCart={this.addToCartHandler}
                cartLoading = {this.props.cartLoading}
                moreInfoCancel={this.moreInfoCancelHandler}
                product ={this.props.products.find(product => product._id === this.state.currentViewingProductId)}/>
            )
        }

        return (
            <Aux>
                <Modal show={this.state.viewingMoreInfo} modalClosed={this.moreInfoCancelHandler }>
                    {moreInfoSummary}
                </Modal>
                {mainPageDisplay}
            </Aux>    
        )
    }
}

//only knows about redux here 
export default connector(withErrorHandler(MainPage, axios))