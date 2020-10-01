import * as actionTypes from './actions';

const initialState = {
    products: [],
    cart: [],
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return {
                ...state,
                loading: true
            };
        
        case actionTypes.UPDATING_CART:
            return {
                ...state,
                cartLoading: true
            };
        
        case actionTypes.GET_PRODUCT: {
            return {
                ...state,
                products: action.payload.data,
                loading: false,
                error: null
            };
        }
        
        case actionTypes.GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cart: action.payload[0],
                cartLoading: false,
                totalPrice: action.payload[1]
            };

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: action.payload[0],
                totalPrice: action.payload[1]
            };
        
        case actionTypes.GET_CART:
            return {
                ...state,
                cart: action.payload.data[0],
                totalPrice: action.payload.data[1]
            }

        default:
            return state;
    }
}

export default reducer