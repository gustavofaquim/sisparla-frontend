import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

import '../styles/components/sidebar.sass';
import '../styles/components/header.sass';

import Sidebar from '../components/Sidebar.jsx';
import UserFront from './UserFront';

const Header = ({isAuthenticated}) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  useEffect(() => {
    // Função para verificar a largura da tela e ocultar o menu lateral se necessário
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarVisible(false); // Defina aqui a largura limite para ocultar o menu
      } else {
        setSidebarVisible(true);
      }
    };

    // Adiciona um ouvinte de evento para a largura da tela
    window.addEventListener('resize', handleResize);

    // Chama a função de verificação da largura da tela uma vez ao carregar a página
    handleResize();

    // Remove o ouvinte de evento ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="menu">
       <div className="header-bar">
        <FaBars onClick={toggleSidebar} /> 
        <span>Menu</span>
        <UserFront /> 
       
      </div>
      {sidebarVisible && <Sidebar active={setSidebarVisible} />}
    </div>
   
  );
};

export default Header;
