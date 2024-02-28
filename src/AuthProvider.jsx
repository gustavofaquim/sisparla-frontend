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
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error('Erro ao decodificar o token: ', error);
        // Adote o comportamento adequado em caso de erro na decodificação
      }
    }
  }, [user]);

  const handleLogout = async() => {
   
    try {
      
      const response = await userFetch.delete(`/logout`)
    
      if(response.status == 200){
        console.log('Até mais ver...')
        sessionStorage.removeItem('token');
        setUser(null);
        window.location.reload();
      }
    } catch (error) {
      console.log('Erro ao realizar logout: ' + error)
      sessionStorage.removeItem('token');
      setUser(null);
      window.location.reload();
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
