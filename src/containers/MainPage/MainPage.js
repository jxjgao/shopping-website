import React, {Component} from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';
import ItemCards from '../../components/ItemCards/ItemCards.js';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import MoreInfo from '../../components/MoreInfo/MoreInfo';


class MainPage extends Component {
    state = {
        products: [],
        itemsInCart: [],
        totalPrice: 0,
        viewingMoreInfo: false,
        currentViewingProductId: 0,
        isLoaded: false
    }

    componentDidMount() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(
                (json) => {
                    this.setState({products: json, isLoaded: true});
                }
            )

    }

    addToCartHandler = (id) => {
        //returns product object with specified id
         const product = this.state.products.find(product => product.id === id)
         const productPrice = product.price
         const currPrice = this.state.totalPrice
         const newPrice = currPrice + productPrice
         this.setState( {totalPrice: newPrice, itemsInCart: this.state.itemsInCart.concat([product])})

         console.log(this.state.totalPrice, this.state.itemsInCart);
    }

    moreInfoClickHandler = (id) => {
        this.setState({viewingMoreInfo: true, currentViewingProductId: id});
    }

    moreInfoCancelHandler = () => {
        this.setState({viewingMoreInfo: false})
    }

    render() {
        let itemGrid =  <ItemCards 
                                productsList={this.state.products} 
                                moreInfo={this.moreInfoClickHandler}
                                />

        if (this.state.isLoaded === false) {
            itemGrid = <Spinner />
        }

        let moreInfoSummary = null;

        if (this.state.currentViewingProductId !== 0) {
            moreInfoSummary = (
            <MoreInfo
                addToCart={this.addToCartHandler}
                moreInfoCancel={this.moreInfoCancelHandler}
                product ={this.state.products.find(product => product.id === this.state.currentViewingProductId)}/>
            )
        }
        return (
            <Aux>
                <Modal show={this.state.viewingMoreInfo} modalClosed={this.moreInfoCancelHandler }>
                    {moreInfoSummary}
                </Modal>
                {itemGrid}
            </Aux>    
        )
    }
}

export default MainPage