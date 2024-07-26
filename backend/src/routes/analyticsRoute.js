const express = require('express');


const { totalInvoices, invoiceStatusCount, amountTrends } = require('../controllers/analyticsController.js');

const router = express.Router();

// Apply authentication middleware to all routes

// Example: Only admins can access analytics routes
router.get('/total-invoices', totalInvoices);
router.get('/invoice-status-count', invoiceStatusCount);
router.get('/amount-trends', amountTrends);

module.exports = router;
