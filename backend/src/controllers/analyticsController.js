
const Invoice = require('../models/invoiceModel.js'); // Assuming Invoice is your model

const totalInvoices = ( async (req, res) => {
    try {
        const totalInvoices = await Invoice.countDocuments();
        res.json({ totalInvoices });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

const invoiceStatusCount = ( async (req, res) => {
    try {
        const paidCount = await Invoice.countDocuments({ status: 'paid' });
        const unpaidCount = await Invoice.countDocuments({ status: 'unpaid' });
        res.json({ paidCount, unpaidCount });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

const amountTrends = ( async (req, res) => {
    try {
        const trends = await Invoice.aggregate([
            {
                $group: {
                    _id: { $month: '$dueDate' },
                    totalAmount: { $sum: '$amount' }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(trends);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = {totalInvoices , invoiceStatusCount , amountTrends}