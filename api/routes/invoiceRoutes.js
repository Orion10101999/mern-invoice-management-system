
import express from 'express'

import { CreateInvoice, AllInvoice, UpdatedInvoice, DeleteInvoice, pdfGenerate } from '../controllers/invoiceController.js'
import verifyToken from '../middleware/verifyUser.js';


const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken)

// Apply authorization middleware to routes that require admin access
router.post('/', CreateInvoice);
router.get('/', AllInvoice); // No admin restriction for viewing invoices
router.put('/:id', UpdatedInvoice);
router.delete('/:id', DeleteInvoice);
router.get('/:id/pdf', pdfGenerate); // PDF generation requires authentication

export default router;
