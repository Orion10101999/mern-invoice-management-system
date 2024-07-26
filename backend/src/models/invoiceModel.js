const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['paid', 'unpaid'], default: 'unpaid' },
},{timestamps:true});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
