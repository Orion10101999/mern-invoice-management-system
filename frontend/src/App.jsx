import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import NoAccess from './components/NoAccess';

const App = () => {
  return (
    <AuthProvider>

    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gray-700 text-white p-4">
          <div className='container mx-auto flex gap-8 justify-between'>

          <div className="flex gap-5">
            <Link to="/" className="font-bold">Invoice App</Link>
          </div>
            <div className='flex justify-end'>
              <Link to="/register" className="mr-4">Register</Link>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/no-access" element={<NoAccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
