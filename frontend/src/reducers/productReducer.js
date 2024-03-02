import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    CLEAR_ERROR,
} from "../constants/productConstant";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case All_PRODUCT_REQUEST:
            return {
                loading: true,
                product: [],
            };
        case All_PRODUCT_SUCCESS:
            return {
                loading: true,
                product: action.payload.productsCount,
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
