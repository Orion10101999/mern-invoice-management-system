const express = require('express');


const { CreateInvoice, AllInvoice, UpdatedInvoice, DeleteInvoice, pdfGenerate } = require('../controllers/invoiceController.js');
const { verifyToken } = require('../middleware/verifyUser.js');

const router = express.Router();
router.use(verifyToken)
// Apply authentication middleware to all routes

// Apply authorization middleware to routes that require admin access
router.post('/', CreateInvoice);
router.get('/', AllInvoice); // No admin restriction for viewing invoices
router.put('/:id', UpdatedInvoice);
router.delete('/:id', DeleteInvoice);
router.get('/:id/pdf', pdfGenerate); // PDF generation requires authentication

module.exports = router;
