
import express from 'express'


import { totalInvoices, invoiceStatusCount, amountTrends } from '../controllers/analyticsController.js'

const router = express.Router();

// Apply authentication middleware to all routes

// Example: Only admins can access analytics routes
router.get('/total-invoices', totalInvoices);
router.get('/invoice-status-count', invoiceStatusCount);
router.get('/amount-trends', amountTrends);

export default router;
