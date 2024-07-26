import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState({
    _id: '',
    invoiceNumber: '',
    customerName: '',
    amount: '',
    dueDate: '',
    status: ''
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('/api/invoices');
        const arr = response.data.reverse()
        setInvoices(arr);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, [invoices]);

  const openEditModal = (invoice) => {
    setCurrentInvoice({
      ...invoice,
      dueDate: formatDate(invoice.dueDate)
    });
    setIsEditing(true);
  };
  

  const handleEditInvoice = async () => {
    try {
      const response = await axios.put(`/api/invoices/${currentInvoice._id}`, currentInvoice);
      setInvoices(invoices.map(invoice => 
        invoice._id === currentInvoice._id ? response.data : invoice
      ));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteInvoice = async (invoiceId) => {
    try {
      await axios.delete(`/api/invoices/${invoiceId}`);
      setInvoices(invoices.filter(invoice => invoice._id !== invoiceId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentInvoice({ ...currentInvoice, [name]: value });
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const handleGeneratePDF = async (invoiceId) => {
    try {
      const response = await axios.get(`/api/invoices/${invoiceId}/pdf`, {
        responseType: 'blob'
      });

      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-300 shadow-md rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Invoice List</h2>
      <ul className="space-y-4">
        {invoices && invoices.map((invoice, i) => (
          <li
            key={invoice._id}
            className="p-4 bg-blue-300 rounded-md shadow-sm flex justify-between items-center"
          >
            <div className="flex-1">
              <p className="font-semibold"><span className="font-normal">{invoices.length - i}.</span></p>
              <p className="font-semibold">Invoice Number: <span className="font-normal">{invoice.invoiceNumber}</span></p>
              <p className="font-semibold">Customer Name: <span className="font-normal">{invoice.customerName}</span></p>
              <p className="font-semibold">Amount: <span className="font-normal">${invoice.amount}</span></p>
              <p className="font-semibold">Due Date: <span className="font-normal">{new Date(invoice.dueDate).toLocaleDateString()}</span></p>
              <p className={`font-semibold ${invoice.status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                Status: <span className="font-normal">{invoice.status}</span>
              </p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => openEditModal(invoice)} 
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mx-5"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteInvoice(invoice._id)} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button 
    onClick={() => handleGeneratePDF(invoice._id)} 
    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
  >
    Generate PDF
  </button>
            </div>
          </li>
        ))}
      </ul>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Invoice</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleEditInvoice(); }}>
              <div className="mb-4">
                <label className="block text-gray-700">Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={currentInvoice.invoiceNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={currentInvoice.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={currentInvoice.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={currentInvoice.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={currentInvoice.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
