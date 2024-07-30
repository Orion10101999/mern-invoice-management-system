import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import PrivateRoute from './components/PrivatetRoute';

import Navbar from './components/Navbar';
import Logout from './pages/Logout';
const App = () => {
 
  return (
  <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar/>
          <div className="container mx-auto p-4 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route element={<PrivateRoute />}>
              <Route path='/invoice-form' element={<InvoiceForm />} />
              <Route path='/invoice-list' element={<InvoiceList />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
  </>
    
  );
};

export default App;
