const mongoose = require("mongoose")
const express = require("express");
const cors = require('cors')

var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())



app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/mern-invoice-management-system")
.then(() =>     
  console.log("Connected to MongoDB")
)
.catch(err =>
  console.log("Could not connect to MongoDB")
)
app.use(express.json());
app.use('/api/auth', require("./src/routes/authRoutes.js"));
app.use('/api/invoices', require("./src/routes/invoiceRoutes.js"));
app.use('/api/analytics', require("./src/routes/analyticsRoute.js"));
app.listen(3000, function(){
    console.log("Server is Running 3000");
})



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});