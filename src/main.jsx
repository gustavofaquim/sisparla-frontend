import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import "./styles/main.sass";

// Componentes
import App from './App.jsx';
import ApoiadoresList from './components/ApoiadoresList.jsx';
import ApoiadoresNovo from './components/ApoiadoresNovo.jsx';
import ApoiadoresFicha from "./components/ApoiadoresFicha.jsx";
import Login from './login.jsx';


const Root = () => {

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
    <Router>

      <Routes>
        <Route path="/" element={<App isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>

          <Route path="apoiadores" element={<PrivateRoute element={<ApoiadoresList />} />}/>
          
          <Route path="novo-apoiador" element={<PrivateRoute element={<ApoiadoresNovo />} />}/>

          <Route path="ficha-apoiador/:id" element={<PrivateRoute element={<ApoiadoresFicha />} />}/>
          
          <Route path="login" element={<Login />} />
        
        </Route>

      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
