import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';

const Logout = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  useEffect(() => {
    // Clear user data from localStorage and context
    dispatch(signOut())
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
