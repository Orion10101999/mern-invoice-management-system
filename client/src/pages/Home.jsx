import React from 'react'
import { useSelector } from 'react-redux'
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';
import { Link } from 'react-router-dom';
import Login from './Login';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
    return (
    <div>
      <h1 className='bg-slate-500 text-blue-200 py-3 px-5'>Welcome to Invoice Management App</h1>
      {
        currentUser ? (<>
        <InvoiceForm/>
        <InvoiceList/>
        <Link to={'/logout'} className='bg-red-600 py-2 px-4'>LogOut</Link>
        </>):(<>
            <Dashboard/>
            <Login/>
        </>)
      }
    </div>
  )
}

export default Home