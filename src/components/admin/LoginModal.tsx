
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';

const LoginModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isOpen || isAuthenticated) return null;

  return <Login />;
};

export default LoginModal;
