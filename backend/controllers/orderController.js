const Order = require("../models/orderModels");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create New Order
exports.newOrder = catchAsyncErrors(async(req,res,next)=> {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    })

    res.status(201).json({
        success:true,
        order,
    })
})

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email",
    );

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }

    res.status(200).json({
        success:true,
        order,
    })
})

// get Logged In User Order
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});
    
    res.status(200).json({
        success:true,
        orders,
    })
})

// get All Order -- Admin 
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();
    
    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount+= order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})

// update Order status -- Admin 
exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    
    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }
    
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",404))
    }

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async(order) => {
            await updateStock(order.product,order.quantity)
        });
    }

    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt= Date.now()
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;
    
    product.save({validateBeforeSave:false})
}

// Delete Order -- Admin 
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    
    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404));
    }

    await Order.deleteOne({ _id: req.params.id });


    res.status(200).json({
        success:true,
    })
})


