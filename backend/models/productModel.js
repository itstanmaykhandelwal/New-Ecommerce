const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLength:[5,"Price cannot be exceed 8 Figure"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"],
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[10,"Stock Cannot exceed 10 Number"],
        default:1
    },
    numOfReview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            required:{
                type:Number,
                required:true,
            },
            comment:{
                type: String,
                required:true,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    color: {
        type: String, 
        required:[true,"Please Enter Product Color"]
    }
})

module.exports = mongoose.model("Product",productSchema)