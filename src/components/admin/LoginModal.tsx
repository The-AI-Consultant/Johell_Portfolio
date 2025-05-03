
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';

const LoginModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === '#admin');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!isOpen || isAuthenticated) return null;
  
  return <Login />;
};

export default LoginModal;
