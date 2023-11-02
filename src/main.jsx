import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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

  const handleLogin = async (data) => {
    try {
      const response = await userFetch.post(`/logar`, data);
      console.log('Bem-vindo, você fez login');

      if (response.status === 200) {
        setAuthenticated(true);
        return <Navigate to="/" />;
        
      } else {
        console.error('Erro durante o login:', response.data.error);
      }
    } catch (error) {
      console.error('Erro durante o login:', error.message);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
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
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
