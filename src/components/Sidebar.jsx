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
    FaDollarSign  
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
        <Sidebar width='250px'>
          <img className='logo' src="../../public/teste.png" alt="teste" />
            <hr />
            <p className='title-menu'>Menu</p>
            <Menu >
                <MenuItem component={<Link to="/" />} icon={<FaHouseUser/>} active={activeMenuItem === 'inicio'} onClick={() => handleMenuItemClick('inicio')}>Início</MenuItem>
                <SubMenu icon={<FaUserAlt/>}  label="Apoidores"  active={activeMenuItem === 'apoiadores'} >
                    <MenuItem component={<Link to="/apoiadores" />} onClick={() => handleMenuItemClick('apoiadores')}> Lista</MenuItem>
                    <MenuItem component={<Link to="/novo-apoiador" />} onClick={() => handleMenuItemClick('apoiadores')}> Novo</MenuItem>
                    <MenuItem component={<Link to="/aniversariantes" />} onClick={() => handleMenuItemClick('apoiadores')}> Aniversariantes</MenuItem>
                </SubMenu>

                <SubMenu icon={<FaChartBar/>} label="Demandas" active={activeMenuItem === 'demandas'} >
                    <MenuItem component={<Link to="/nova-demanda" />} onClick={() => handleMenuItemClick('demandas')}> Cadastrar Nova</MenuItem>
                    <MenuItem component={<Link to="/demandas " />} onClick={() => handleMenuItemClick('demandas')}> Demandas</MenuItem>
                </SubMenu>

                <SubMenu icon={<FaCalendarAlt/>} label="Eventos" active={activeMenuItem === 'eventos'} >
                    <MenuItem component={<Link to="/novo-evento" />} onClick={() => handleMenuItemClick('eventos')}> Cadastrar Evento</MenuItem>
                    <MenuItem component={<Link to="/eventos " />} onClick={() => handleMenuItemClick('eventos')}> Eventos</MenuItem>
                </SubMenu>

                <SubMenu disabled icon={<FaDollarSign/>} label="Despesas" active={activeMenuItem === 'despesas'} >
                <MenuItem component={<Link to="/nova-mensagem" />} onClick={() => handleMenuItemClick('despesas')}>Cadastrar Depesas</MenuItem>
                    <MenuItem component={<Link to="/lista-contatos" />} onClick={() => handleMenuItemClick('despesas')}>Lista de Despesas</MenuItem>
                </SubMenu>

                <SubMenu disabled icon={<FaWhatsapp />}  label="Mensagens"  active={activeMenuItem === 'mensagens'} > 
                    <MenuItem component={<Link to="/nova-mensagem" />} onClick={() => handleMenuItemClick('mensagens')}>Enviar Mensagem</MenuItem>
                    <MenuItem component={<Link to="/lista-contatos" />} onClick={() => handleMenuItemClick('mensagens')}>Lista de Contatos</MenuItem>
                </SubMenu>

                <MenuItem icon={<FaRegWindowClose/>} onClick={logoutAndRedirect} >Sair</MenuItem>

                
            </Menu>
        </Sidebar>
    </div>
    );
};

export default Sidebars;
