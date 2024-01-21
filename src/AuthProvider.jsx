// AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

import userFetch from './axios/config.js';

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

  const handleLogout = async() => {
   
    const response = await userFetch.delete(`/logout`)
    
    console.log(response)

    if(response.status === 200){
      console.log('Até mais ver...')
      sessionStorage.removeItem('token');
      setUser(null);
      window.location.reload();
      navigate('/login');
      
    }
    else if(response.status === 401){
      console.log('deu erooo aquiiii')
    }
   

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
