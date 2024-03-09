import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERROR,
} from "../constants/productConstant";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case All_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case All_PRODUCT_SUCCESS:
            return {
                loading: true,
                products: action.payload.products,
                productsCount:action.payload.productsCount,
                resultPerPage:action.payload.resultPerPage
            };
        case All_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Product Details
export const productDetailsReducer = (state = { product : {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: true,
                product: action.payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
