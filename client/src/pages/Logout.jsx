import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';
import axios from 'axios';

const Logout = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  useEffect(() => {
    const logoutSite = async () => {
      try {
        const response = await axios.get('/api/auth/logout')
        console.log(response.data);
      }catch{(err)=>{
        console.log(err);
      }}
      dispatch(signOut())
  
      // Redirect to login page
      navigate('/login');
    // Clear user data from localStorage and context
  }

  logoutSite()
}, [navigate])

  return null;
};

export default Logout;
