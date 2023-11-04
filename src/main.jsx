import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider } from "./AuthProvider";

import './styles/main.sass';

import App from './App';
import ApoiadoresList from './components/ApoiadoresList';
import ApoiadoresNovo from './components/ApoiadoresNovo';
import ApoiadoresFicha from './components/ApoiadoresFicha';
import ApoiadorEdit from './components/ApoiadoresEdit';
import NovaDemanda from './components/demandas/Nova';
import Login from './login';
import Aniversariantes from './components/Aniversariantes';
import userFetch from './axios/config';

const Root = () => {
  
  const [isAuthenticated, setAuthenticated] = React.useState(false);
 


  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        // Adicione lógica para verificar a validade do token se necessário
        setAuthenticated(true);
        console.log('Token valido')
        
      }
    };

    checkAuthentication();
  }, []);


  const handleLogin = async (data) => {
   
    try {
      const response = await userFetch.post(`/logar`, data);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setAuthenticated(true);
        return true;
        
      } else {
        console.error('Erro durante o login:', response.data.error);
        return false;
       
      }
    } catch (error) {
      console.error('Erro durante o login:', error.message);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Saiu do sistema')
    setAuthenticated(false);
  };

  const PrivateRoute = ({ element }) => {
    const storedToken = localStorage.getItem('token');
    const isAuthenticated = !!storedToken;

    if (!isAuthenticated) {
      console.log('Redirecionando para /login');
      return <Navigate to="/login" />;
    }

    return element;
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>
            <Route path="apoiadores" element={<PrivateRoute element={<ApoiadoresList />} />} />
            <Route path="aniversariantes" element={<PrivateRoute element={<Aniversariantes />} />} />
            <Route path="novo-apoiador" element={<PrivateRoute element={<ApoiadoresNovo />} />} />
            <Route path="apoiador/:id" element={<PrivateRoute element={<ApoiadoresFicha />} />} />
            <Route path="apoiador-edit/:id" element={<PrivateRoute element={<ApoiadorEdit />} />} />
            <Route path="nova-demanda" element={<PrivateRoute element={<NovaDemanda />} />} />
            <Route path="login" element={<Login onLogin={handleLogin} />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
