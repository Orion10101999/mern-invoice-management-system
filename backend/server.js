const mongoose = require("mongoose")
const express = require("express");
const cors = require('cors')
const path = require('path')
var cookieParser = require('cookie-parser')
require('dotenv').config()
var app = express()
app.use(cookieParser())



app.use(cors())

mongoose.connect(process.env.MONGO_URI)
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
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is Running 3000");
})

const dirname = path.resolve();

app.use(express.static(path.join(dirname, '/client/dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'));
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