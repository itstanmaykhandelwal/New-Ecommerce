const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async(req,res,nex) => {
    const myPayment = await stripe.paymentIntent.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecomerce",
        }
    })
})