const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErros = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");

// Register a user
exports.registerUser = catchAsyncErros(async(req,res,next) =>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepic"
        }
    })

    sendToken(user,201,res)
})


// Login User

exports.loginUser = catchAsyncErros (async(req,res,next)=>{
    const {email,password} = req.body;

    // checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        // return next(new ErrorHandler("Invalid email or password",401));
        return next(new ErrorHandler("Invalid email ",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        // return next(new ErrorHandler("Invalid email or password",401));
        return next(new ErrorHandler("password",401));
    }

    sendToken(user,200,res);
})

// Logout User
exports.logout = catchAsyncErros(async(req,res,next) => {

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        sucess:true,
        message:"Logged Out"
    })
})