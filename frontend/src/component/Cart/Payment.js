import React, { useRef } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import './payment.css';
import { MdCreditCard } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { MdOutlineVpnKeyOff } from "react-icons/md";

const Payment = ({history}) => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const {shippingInfo,cartItems} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);
    const {error} = useSelector((state) => state.newOder);

    const paymentData = {
        amount:Math.round(orderInfo.totalPrice * 100),
    };

    const submitHandler = async(e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try{
            const config = {
                headers:{
                    "Content-Type":"application/json"
                },
            };
            const {data} = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            )

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.configureCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pinCode,
                            country:shippingInfo.country,
                        },
                    },
                },
            })
            if(result.error){
                payBtn.current.disabled = false;

                alert.error(result.error.message)
            }
            else{
                if(result.paymentIntent.status === "succeeded"){
                    history.push("/success");
                }  
                else{
                    alert.error("There is some issue while processing payment");
                }  
            }

        }catch(error){
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    }
    return (
        <>
            {/* <MetaData title={Payment}/> */}
            <CheckOutSteps activeStep={2}/>
            <div className="paymentContainer">
                <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <MdCreditCard/>
                        <CardNumberElement className='paymentInput'/>
                    </div>
                    <div>
                        <MdEvent/>
                        <CardExpiryElement className='paymentInput'/>
                    </div>
                    <div>
                        <MdOutlineVpnKeyOff/>
                        <CardCvcElement className='paymentInput'/>
                    </div>
                    <input 
                        type="submit"
                        value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className='paymentFormBtn' 
                    />
                </form>
            </div>
        </>
    )
}

export default Payment