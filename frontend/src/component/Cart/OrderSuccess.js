import { Typography } from '@material-ui/core';
import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import {Link} from "react-router-dom";
import './orderSuccess.css'

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <MdCheckCircle/>
            <Typography>Your Order has been Placed successfully</Typography>
            <Link to="/order/me"></Link>
        </div>
    )
}

export default OrderSuccess