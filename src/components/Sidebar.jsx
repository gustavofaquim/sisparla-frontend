import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from "react";
import { Link } from 'react-router-dom';

import { useAuth } from '../AuthProvider'; // Importação hook useAuth

import "../styles/components/sidebar.sass"


import { 
    FaTimes, 
    FaHome, 
    FaEnvelope, 
    FaRegSun, 
    FaUserAlt, 
    FaIdCardAlt, 
    FaRegFileAlt,
    FaRegCalendarAlt,
    FaChartBar,
    FaCalendarAlt,
    FaRegWindowClose,
    FaHouseUser 
  } from 'react-icons/fa';

const Sidebars = () => {
  // Use o hook useAuth para obter a função handleLogout
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const [activeMenuItem, setActiveMenuItem] = useState('inicio'); // Defina o item inicialmente ativo

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    // Adicione qualquer lógica adicional que você precise quando um item do menu for clicado
  };

  const logoutAndRedirect = () => {
    handleLogout();
    window.location.reload();
    navigate('/login');
  };

  
  
  return (
    <div className='sidebar-menu'>
        <Sidebar>
            <Menu >
                <MenuItem component={<Link to="/" />} icon={<FaHouseUser/>} onClick={() => handleMenuItemClick('inicio')}>Início</MenuItem>
                <SubMenu icon={<FaUserAlt/>}  label="Apoidores"  active={activeMenuItem === 'apoiadores'} >
                    <MenuItem component={<Link to="/apoiadores" />} onClick={() => handleMenuItemClick('apoiadores')}> Lista</MenuItem>
                    <MenuItem component={<Link to="/novo-apoiador" />} onClick={() => handleMenuItemClick('apoiadores')}> Novo</MenuItem>
                    <MenuItem component={<Link to="/aniversariantes" />} onClick={() => handleMenuItemClick('apoiadores')}> Aniversariantes</MenuItem>
                    <MenuItem component={<Link to="/nova-mensagem" />} onClick={() => handleMenuItemClick('apoiadores')}> Enviar Mensagem</MenuItem>
                </SubMenu>

                <SubMenu icon={<FaChartBar/>} label="Demandas" active={activeMenuItem === 'demandas'} >
                    <MenuItem component={<Link to="/nova-demanda" />} onClick={() => handleMenuItemClick('demandas')}> Cadastrar Nova</MenuItem>
                    <MenuItem component={<Link to="/demandas " />} onClick={() => handleMenuItemClick('demandas')}> Demandas</MenuItem>
                </SubMenu>

                <SubMenu icon={<FaCalendarAlt/>} label="Eventos" active={activeMenuItem === 'eventos'} >
                    <MenuItem component={<Link to="/novo-evento" />} onClick={() => handleMenuItemClick('eventos')}> Cadastrar Evento</MenuItem>
                    <MenuItem component={<Link to="/eventos " />} onClick={() => handleMenuItemClick('eventos')}> Eventos</MenuItem>
                </SubMenu>

                <MenuItem icon={<FaRegWindowClose/>} onClick={logoutAndRedirect} >Sair</MenuItem>

                
            </Menu>
        </Sidebar>
    </div>
    );
};

export default Sidebars;
