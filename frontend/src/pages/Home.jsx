import React from 'react'

import InvoiceForm from '../components/InvoiceForm'
import InvoiceList from '../components/InvoiceList'
import Dashboard from '../components/Dashboard'

const Home = () => {
  return (
    <div className='flex flex-col justify-center gap-5'>
      <Dashboard/>
      <InvoiceForm/>
      <InvoiceList/>
      
    </div>
  )
}

export default Home