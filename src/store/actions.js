import axios from '../axio-cart';
import _ from 'lodash';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_CART = 'GET_CART';
export const UPDATING_CART = 'UPDATING_CART';
export const LOADING = 'LOADING';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL';

export const getProduct = () => async (dispatch) => {
    dispatch({type: 'LOADING'});
    try {
        const res = await axios.get('/product/find-all-product')
        const products = res.data
        products.sort()
    
        dispatch({type: 'GET_PRODUCT', payload: products})
    } catch(error){
        dispatch({type: 'GET_PRODUCT_FAIL', payload: error})
    }
}

export const addToCart = (id, productList) => async (dispatch) => {
    dispatch({type: 'UPDATING_CART'})
    let res = {}
    let updatedCart = []
    let organizedCart = []
    let countArray = []
    let item = {}
    let totalPrice = 0

    let cart = await axios.get('/cart/5f63e617b29b17b8d1f854a7/find-cart-by-id');

    if (cart.data.length === 0) {
        res = await axios.post('/cart/create-cart', {productID: id, userID: '5f63e617b29b17b8d1f854a7'})
        updatedCart = res.data

    } else {
        res = await axios.put('/cart/add-to-cart', {productID: id, userID: '5f63e617b29b17b8d1f854a7'})
        updatedCart = res.data

    }
    
    countArray = _.map(_.countBy(updatedCart), (val, key) => ({productID: key, count: val }));
    for (let i = 0; i < countArray.length; i++) {
        item = productList.find(product => product._id === countArray[i].productID)
        totalPrice += item.price * countArray[i].count
        item.count = countArray[i].count
        organizedCart.push(item);
    }
        

    dispatch({type: 'ADD_TO_CART', payload: [organizedCart, totalPrice]})
}

export const removeFromCart = (id, productList) => async (dispatch) => {
    let res = {}
    let item = {}
    let updatedCart = []
    let countArray = []
    let organizedCart = []
    let totalPrice = 0

    res = await axios.put('/cart/remove-from-cart', {productID: id, userID: '5f63e617b29b17b8d1f854a7'});
    updatedCart = res.data

    countArray = _.map(_.countBy(updatedCart), (val, key) => ({productID: key, count: val }));
    for (let i = 0; i < countArray.length; i++) {
        item = productList.find(product => product._id === countArray[i].productID)
        totalPrice += item.price * countArray[i].count
        item.count = countArray[i].count
        organizedCart.push(item);
    }

    dispatch({type: 'REMOVE_FROM_CART', payload: [organizedCart, totalPrice]})

}

export const getCart = () => async(dispatch) => {
        const res = await axios.get('/cart/5f63e617b29b17b8d1f854a7/group-product');

        if (res) {
            dispatch({type: 'GET_CART', payload: res})
        }
    
}
//import get product, map dispatch to the prop


