import React, {Component} from 'react';
import {store} from 'react-notifications-component';
import _ from 'lodash';

import Axios from '../../axio-cart';
import ItemCards from '../../components/ItemCards/ItemCards.js';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import MoreInfo from '../../components/MoreInfo/MoreInfo';


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cartFound: false,
            viewingMoreInfo: false,
            currentViewingProductId: 0,
            isLoaded: false
        }
        this.addToCart = this.addToCart.bind(this);
        this.createNotification = this.createNotification.bind(this);
    }

    componentDidMount() {
        Axios.get('/product/find-all-product')
            .then(res => res.data)
            .then(
                (data) => {
                    this.setState({ products: data, isLoaded: true })
                }
            )
    }

    addToCartHandler = (id, type) => {
        //returns product object with specified id
        this.addToCart(id);
        this.createNotification(type);

    }

    moreInfoClickHandler = (id) => {
        console.log(id)
        this.setState({viewingMoreInfo: true, currentViewingProductId: id});
    }

    moreInfoCancelHandler = () => {
        this.setState({viewingMoreInfo: false})
    }

    addToCart = async(id) => {
        const product = this.state.products.find(product => product._id === id)
        const productPrice = product.price
        //if it returns empty object, it means that the cart doesn't current exist, so we create a new one
        //hard coded userID fro now
        //console.log( _.isEmpty({}) );  true
        await Axios.get('/cart/5f63e617b29b17b8d1f854a7/find-cart-by-id')
                    .then(res => (_.isEmpty(res.data) === true) ? this.setState({cartFound: false}) : this.setState({cartFound: true}))
            //
        
        if (this.state.cartFound === true) {
            await Axios.put('/cart/add-to-cart', {product: product, userID: '5f63e617b29b17b8d1f854a7', price: productPrice})
        } else {
            await Axios.post('/cart/create-cart', {product: product, userID: '5f63e617b29b17b8d1f854a7', price: productPrice})
        }
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
                                productsList={this.state.products} 
                                moreInfo={this.moreInfoClickHandler}
                                />

        if (this.state.isLoaded === false) {
            mainPageDisplay = <Spinner />
        }

        let moreInfoSummary = null;

        if (this.state.currentViewingProductId !== 0) {
            moreInfoSummary = (
            <MoreInfo
                addToCart={this.addToCartHandler}
                moreInfoCancel={this.moreInfoCancelHandler}
                product ={this.state.products.find(product => product._id === this.state.currentViewingProductId)}/>
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

export default MainPage