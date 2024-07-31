
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose';



const app = express()



app.use(cookieParser())
app.use(express.json());
app.use(cors())


mongoose.connect(process.env.MONGO_URI)
.then(() =>     
  console.log("Connected to MongoDB")
)
.catch(err =>
  console.log("Could not connect to MongoDB")
)

import authRote from './api/routes/authRoutes.js'
import invoiceRoute from './api/routes/invoiceRoutes.js' 
import analyticsRoute from './api/routes/analyticsRoute.js'

app.use('/api/auth',authRote);
app.use('/api/invoices', invoiceRoute);
app.use('/api/analytics', analyticsRoute);

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