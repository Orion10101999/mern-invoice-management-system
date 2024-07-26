import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, loading , isAdmin } = useAuth();
    const navigate = useNavigate();

    const [totalInvoices, setTotalInvoices] = useState(0);
    const [invoiceStatus, setInvoiceStatus] = useState({ paid: 0, unpaid: 0 });
    const [amountTrends, setAmountTrends] = useState([]);

    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigate('/no-access'); // Redirect if not an admin
            return;
        }

        fetch('/api/analytics/total-invoices')
            .then(res => res.json())
            .then(data => setTotalInvoices(data.totalInvoices));

        fetch('/api/analytics/invoice-status-count')
            .then(res => res.json())
            .then(data => setInvoiceStatus({ paid: data.paidCount, unpaid: data.unpaidCount }));

        fetch('/api/analytics/amount-trends')
            .then(res => res.json())
            .then(data => setAmountTrends(data));
    }, [loading, user, navigate]);

    if (loading) return <div>Loading...</div>;

    const statusData = {
        labels: ['Paid', 'Unpaid'],
        datasets: [
            {
                label: 'Invoices',
                data: [invoiceStatus.paid, invoiceStatus.unpaid],
                backgroundColor: ['#36a2eb', '#ff6384']
            }
        ]
    };

    const trendsData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: 'Total Amount',
                data: amountTrends.map(trend => trend.totalAmount),
                backgroundColor: '#36a2eb'
            }
        ]
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Invoices: {totalInvoices}</h2>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Invoice Status</h2>
                    <div className="h-64">
                        <Pie data={statusData} />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
                <h2 className="text-xl font-semibold mb-2">Amount Trends</h2>
                <div className="h-96">
                    <Bar data={trendsData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
