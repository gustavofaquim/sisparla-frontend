import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';


import ApoiadoresList from './components/ApoiadoresList.jsx';
import ApoiadoresNovo from './components/ApoiadoresNovo.jsx';
import Login from './login.jsx';


const AppRoutes  = () => {
    const [isAuthenticated, setAuthenticated] = useState(true);

    const handleLogin = () => {
        // Lógica de autenticação aqui (por exemplo, chamada à API de login)
        // Se a autenticação for bem-sucedida, chame setAuthenticated(true)
        setAuthenticated(true);
    };

    const handleLogout = () => {
        // Lógica de logout aqui
        // Por exemplo, chame setAuthenticated(false)
        setAuthenticated(false);
    };


    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };


    return (
    
        <Routes>
          <AppRoutes path="/" element={<App isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>
  
            <AppRoutes path="/apoiadores" element={<PrivateRoute element={<ApoiadoresList />} />}/>
            
            <AppRoutes path="/novo-apoiador" element={<PrivateRoute element={<ApoiadoresNovo />} />}/>
            
            <AppRoutes path="/login"  />
          
          </AppRoutes>
  
        </Routes>
    );
};

export default AppRoutes;