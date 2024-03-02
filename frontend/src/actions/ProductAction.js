import axios from 'axios';
import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    CLEAR_ERROR,
} from "../constants/productConstant";

export const getProduct = () =>  async(dispatch) => {
    try{
        dispatch({type:All_PRODUCT_REQUEST});
        const {data}= await axios.get("/api/v1/products");

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

// Clearing ERRORS
export const clearErrors = () =>  async(dispatch) => {
    dispatch({type:CLEAR_ERROR})
}