import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React from 'react'
import { MdAccountBalance, MdLocalShipping } from 'react-icons/md'
import { GiConfirmed } from "react-icons/gi";
import './CheckoutSteps.css'

const CheckOutSteps = ({activeStep}) => {
    const steps =[
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<MdLocalShipping/>,
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<GiConfirmed />
            ,
        },
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<MdAccountBalance/>,
        }
    ];

    const stepStyle = {
        boxSizing:"border-box",
    }
    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
                {steps.map((item,index) => (
                    <Step key={index} active={activeStep === index ? true : false} 
                    completed={activeStep >= index ? true : false}>
                        <StepLabel icon={item.icon}>{item.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default CheckOutSteps