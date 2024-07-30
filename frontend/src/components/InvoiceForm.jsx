import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('unpaid');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const invoiceData = { invoiceNumber, customerName, amount, dueDate, status };
    try {
      const response = await axios.post('/api/invoices', invoiceData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setInvoiceNumber('')
    setCustomerName('')
    setAmount('')
    setDueDate('')
    setStatus('unpaid')
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-green-400 shadow-md rounded-lg mt-5">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="invoiceNumber">Invoice Number</label>
        <input
          id="invoiceNumber"
          type="text"
          placeholder="Invoice Number"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="customerName">Customer Name</label>
        <input
          id="customerName"
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Create Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;

