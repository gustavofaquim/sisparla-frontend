// AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  
    const token = sessionStorage.getItem('token');
  
    if (token && !user) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, [user]);

  const handleLogout = () => {

    sessionStorage.removeItem('token');
    setUser(null);
    console.log('Até mais ver...')
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
