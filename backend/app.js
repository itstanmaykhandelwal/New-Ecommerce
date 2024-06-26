const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error")

// config
dotenv.config({path:"backend/config/config.env"})



// app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit: '5mb'}));
// app.use(json({limit: "5mb"}));
// app.use(bodyParser.urlencoded({limit: "5mb", extended: true, parameterLimit:5000}));
app.use(fileUpload());

// Routes Imports
const products = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1",products);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

// MiddleWare for Errors
app.use(errorMiddleware);


module.exports = app