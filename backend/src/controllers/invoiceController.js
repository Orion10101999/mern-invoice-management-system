const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Invoice = require('../models/invoiceModel.js')


const CreateInvoice = async (req , res) => {
    const { invoiceNumber, customerName, amount, dueDate, status } = req.body;
    try {
      const invoice = new Invoice({ invoiceNumber, customerName, amount, dueDate, status });
      await invoice.save();
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const AllInvoice = async ( req , res ) => {
    try {
      const invoices = await Invoice.find({});
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// Update Invoice

const UpdatedInvoice = async ( req , res ) => {
    const { invoiceNumber, customerName, amount, dueDate, status } = req.body;
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (invoice) {
        invoice.invoiceNumber = invoiceNumber;
        invoice.customerName = customerName;
        invoice.amount = amount;
        invoice.dueDate = dueDate;
        invoice.status = status;
        const updatedInvoice = await invoice.save();
        res.json(updatedInvoice);
      } else {
        res.status(404).json({ message: 'Invoice not found' });
      }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete Invoice
const DeleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      res.status(404).json({ message: 'Invoice not found' });
    } else {
      res.json({ message: 'Invoice removed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const pdfGenerate = ( async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).send('Invoice not found');
    }

    const doc = new PDFDocument();
    res.setHeader('Content-disposition', `attachment; filename=${invoice.invoiceNumber}.pdf`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);
    doc.fontSize(25).text('Invoice', {
      align: 'center'
    });
    doc.fontSize(16).text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.text(`Customer Name: ${invoice.customerName}`);
    doc.text(`Amount: $${invoice.amount}`);
    doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`);
    doc.text(`Status: ${invoice.status}`);
    doc.end();
  } catch (error) {
    res.status(500).send('Error generating PDF');
  }
});



module.exports = {CreateInvoice , AllInvoice ,UpdatedInvoice , DeleteInvoice , pdfGenerate}

