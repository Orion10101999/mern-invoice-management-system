const mongoose = require("mongoose")
const express = require("express");
const cors = require('cors')
const app = express()
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




/*


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const { protect } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/todo-invoice-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/invoices', protect, invoiceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

*/