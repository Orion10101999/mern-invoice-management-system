import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

    return ( 
        <nav className="bg-gray-700 text-white p-4">
            <div className='container mx-auto flex justify-between'>
                <div className="flex gap-5">
                    <Link to="/" className="font-bold">Invoice App</Link>
                    <Link to="/dashboard" className="font-bold">Dashboard</Link>
                    {currentUser && (
                        <>
                            <Link to="/invoice-list" className="font-bold">List Invoice</Link>
                            <Link to="/invoice-form" className="font-bold">Add Invoice</Link>
                        </>
                    )}
                </div>
                <div className="flex gap-5">
                    {currentUser ? (
                        <Link to="/logout" className="font-bold">Logout</Link>
                    ) : (
                        <>
                            <Link to="/login" className="font-bold">Login</Link>
                            <Link to="/register" className="font-bold">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
