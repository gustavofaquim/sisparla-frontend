import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from "react";
import { Link } from 'react-router-dom';

import { useAuth } from '../AuthProvider'; // Importação hook useAuth

import "../styles/components/sidebar.sass"


import { 
    FaUserAlt, 
    FaChartBar,
    FaCalendarAlt,
    FaRegWindowClose,
    FaHouseUser,
    FaWhatsapp,
    FaDollarSign,
    FaArrowLeft   
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
    
  };


  return (
    <div className='sidebar-menu'>
        <Sidebar width='250px'>
          <img className='logo-menu' src="/logo.png" alt="logo" />
            <hr />
            <p className='title-menu'>Menu</p>
            <Menu >
                <MenuItem component={<Link to="/" />} icon={<FaHouseUser/>} active={activeMenuItem === 'inicio'} onClick={() => handleMenuItemClick('inicio')}>Início</MenuItem>
                
                <SubMenu icon={<FaUserAlt/>}  label="Apoidores"  active={activeMenuItem === 'apoiadores'} >
                    <MenuItem component={<Link to="/apoiadores" />} onClick={() => handleMenuItemClick('apoiadores')}>Apoiadores</MenuItem>
                    <MenuItem component={<Link to="/aniversariantes" />} onClick={() => handleMenuItemClick('apoiadores')}>Aniversariantes</MenuItem>
                    <MenuItem component={<Link to="/grupos" />} onClick={() => handleMenuItemClick('apoiadores')}>Grupos</MenuItem>
                </SubMenu>

                <MenuItem icon={<FaChartBar/>} component={<Link to="/demandas " />} active={activeMenuItem === 'demandas'} onClick={() => handleMenuItemClick('demandas')}> Demandas</MenuItem>

                <MenuItem component={<Link to="/eventos " />} icon={<FaCalendarAlt/>} active={activeMenuItem === 'eventos'} onClick={() => handleMenuItemClick('eventos')}> Eventos</MenuItem>

                <SubMenu icon={<FaDollarSign/>} label="Despesas" active={activeMenuItem === 'despesas'} >
                    <MenuItem component={<Link to="/despesas" />} onClick={() => handleMenuItemClick('despesas')}>Despesas</MenuItem>
                    <MenuItem component={<Link to="/lista-credores" />} onClick={() => handleMenuItemClick('despesas')}>Credores</MenuItem>
                </SubMenu> 

                <SubMenu disabled icon={<FaWhatsapp />}  label="Mensagens"  active={activeMenuItem === 'mensagens'} > 
                    <MenuItem component={<Link to="/nova-mensagem" />} onClick={() => handleMenuItemClick('mensagens')}>Enviar Mensagem</MenuItem>
                    <MenuItem component={<Link to="/lista-contatos" />} onClick={() => handleMenuItemClick('mensagens')}>Lista de Contatos</MenuItem>
                </SubMenu>
                
                {/* <MenuItem icon={<FaArrowLeft />} onClick={logoutAndRedirect} >Sair</MenuItem> */}

                
            </Menu>
        </Sidebar>
    </div>
    );
};

export default Sidebars;
