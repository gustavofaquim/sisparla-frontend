import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider } from "./AuthProvider";
import { AutoLogout } from './AutoLogout'; //Encerra a sessão por inativiade

//import PrivateRoute from './PrivateRoute';


import './styles/main.sass';

import App from './App';
import Home from "./components/Home";
import ApoiadoresList from './components/ApoiadoresList';
import ApoiadoresNovo from './components/ApoiadoresNovo';
import ApoiadoresFicha from './components/ApoiadoresFicha';
import ApoiadorEdit from './components/ApoiadoresEdit';
import NovaDemanda from './components/demandas/Nova';
import DemandasList from "./components/demandas/Lista";
import DemandasEdit from "./components/demandas/Edit";
import NovoEvento from "./components/eventos/Novo";
import ListaEvento from "./components/eventos/Lista";
import EditEvento from "./components/eventos/Edit";
import ListaDespesa from "./components/despesas/Lista";
import ListaCredor from "./components/despesas/ListaCredor";
import CredorEdit from "./components/despesas/EditCredor";
import NovoCredor from "./components/despesas/CredorNovo";
import EditDespesa from "./components/despesas/Edit";
import NovaDespesa from "./components/despesas/Nova";
import Login from './login';
import Aniversariantes from './components/Aniversariantes';
import NovaMensagem from './components/mensagens/NovaMensagem';
import ListaContatos from './components/mensagens/ListaContatos';
import Grupo from './components/grupos/Lista.jsx';
import Error404 from './components/error/Error404.jsx';
import userFetch from './axios/config';
import { ToastContainer, toast } from 'react-toastify';

const Root = () => {
  
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [permissions, setPermissions] = useState();
  
 
  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = sessionStorage.getItem('token');

      if (storedToken) {
        // Adicione lógica para verificar a validade do token se necessário
        setAuthenticated(true);
      }
      
    };

    checkAuthentication();
  }, []);


  const handleLogin = async (data) => {
   
    try {
      const response = await userFetch.post(`/logar`, data);

      if (response.status === 200) {
        const { token } = response.data;
        
        sessionStorage.setItem('token', token);
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


  const PrivateRoute = ({ element, requiredPermissions }) => {

    const storedToken = sessionStorage.getItem('token');
    const isAuthenticated = !!storedToken;

    const user = JSON.parse(sessionStorage.getItem('usuario'));

    if(!user.regra){
      return <Navigate to="/login" />;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    //console.log('Página: ' + requiredPermissions);
    //console.log('Aluno:' + user.regra)

    if((requiredPermissions) && !(user.regra == requiredPermissions)){
        return <Navigate to="/sem-permissao" />;
    }

    

    return element;
  };

  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
            {/* <Route path="/" element={<App isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>  */}
            <Route path="/" element={<App isAuthenticated={isAuthenticated}  />}>
            <Route path="/" element={<PrivateRoute element={<Home />} requiredPermissions={'1'} />} />
            <Route path="apoiadores" element={<PrivateRoute element={<ApoiadoresList />} />} />
            <Route path="aniversariantes" element={<PrivateRoute element={<Aniversariantes />} />} />
            <Route path="novo-apoiador" element={<PrivateRoute element={<ApoiadoresNovo />} />} />
            <Route path="apoiador/:id" element={<PrivateRoute element={<ApoiadoresFicha />} />} />
            <Route path="apoiador-edit/:id" element={<PrivateRoute element={<ApoiadorEdit />} />} />
            <Route path="nova-demanda" element={<PrivateRoute element={<NovaDemanda />} />} />
            <Route path="demandas" element={<PrivateRoute element={<DemandasList />} />} />
            <Route path="demandas/:id" element={<PrivateRoute element={<DemandasEdit />} />} />
            <Route path="novo-evento" element={<PrivateRoute element={<NovoEvento />} />} />
            <Route path="eventos" element={<PrivateRoute element={<ListaEvento />} />} />
            <Route path="eventos/:id" element={<PrivateRoute element={<EditEvento />} />} />
                      
           <Route path="despesas"  element={<PrivateRoute element={<ListaDespesa />}  requiredPermissions={'2'} />} /> 
            
            <Route path="despesas/:id" element={<PrivateRoute element={<EditDespesa />} requiredPermissions={'2'} />} />
            <Route path="nova-despesa" element={<PrivateRoute element={<NovaDespesa />} requiredPermissions={'2'} />} />
            <Route path="lista-credores" element={<PrivateRoute element={<ListaCredor />} requiredPermissions={'2'} />} />
            <Route path="novo-credor" element={<PrivateRoute element={<NovoCredor />} requiredPermissions={'2'} />} />
            <Route path="credor/:id" element={<PrivateRoute element={<CredorEdit />} requiredPermissions={'2'} />} />
            <Route path="nova-mensagem" element={<PrivateRoute element={<NovaMensagem />} requiredPermissions={'1'} />} /> 
            <Route path="lista-contatos" element={<PrivateRoute element={<ListaContatos />} requiredPermissions={'1'} />} />
            <Route path="grupos" element={<PrivateRoute element={<Grupo />} />} />
            <Route path="login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </Router>
      <AutoLogout />
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
