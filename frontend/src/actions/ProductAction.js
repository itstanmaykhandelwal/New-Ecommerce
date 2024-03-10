import axios from 'axios';
import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERROR,
} from "../constants/productConstant";

export const getProduct = (keyword="",currentPage=1,price=[500,60000],category,color,ratings=0) =>  async(dispatch) => {
    try{
        dispatch({type:All_PRODUCT_REQUEST});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        if(color){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&color=${color}`;
        }
        const {data}= await axios.get(link);

        dispatch({
            type:All_PRODUCT_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch({
            type:All_PRODUCT_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const getProductDetails = (id) =>  async(dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data}= await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message,
        })
    }
}

// Clearing ERRORS
export const clearErrors = () =>  async(dispatch) => {
    dispatch({type:CLEAR_ERROR})
}