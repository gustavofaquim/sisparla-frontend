// AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('AuthProvider useEffect');
  
    const token = localStorage.getItem('token');
  
    if (token && !user) {
      const decodedUser = jwtDecode(token);
      console.log('Token decodificado:', decodedUser);
      setUser(decodedUser);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
