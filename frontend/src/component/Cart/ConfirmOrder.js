import React from 'react';
import CheckOutSteps from './CheckOutSteps';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import './confirmOrder.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems, loading } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    console.log(user)

    // Ensure that shippingInfo and cartItems are available before accessing them
    if (loading || !shippingInfo || !cartItems) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1500 ? 0 : 50;
    const totalPrice = subtotal + shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`;

    const processToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            totalPrice
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        history.push("/process/payment");
    };

    return (
        <>
            <MetaData title="Confirm Order" />
            <CheckOutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems.map(item => (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                                    <span>
                                        {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                        </div>
                        <div className="orderSummaryTotal">
                            <p><b>Total:</b></p>
                            <span>₹{totalPrice}</span>
                        </div>
                        <button onClick={processToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOrder;
