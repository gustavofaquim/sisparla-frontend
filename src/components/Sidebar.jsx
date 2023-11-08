import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
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
    FaRegWindowClose
  } from 'react-icons/fa';

const Sidebars = () => {
  // Use o hook useAuth para obter a função handleLogout
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    window.location.reload();
    navigate('/login');
  };
  
  return (
    <div className='sidebar-menu'>
        <Sidebar>
            <Menu>
                <SubMenu  icon={<FaUserAlt/>} label="Apoidores">
                    <MenuItem component={<Link to="/apoiadores" />}> Lista</MenuItem>
                    <MenuItem component={<Link to="/novo-apoiador" />}> Novo</MenuItem>
                    <MenuItem component={<Link to="/aniversariantes" />}> Aniversariantes</MenuItem>
                </SubMenu>

                <SubMenu icon={<FaChartBar/>} label="Demandas">
                    <MenuItem component={<Link to="/nova-demanda" />}> Cadastrar Nova</MenuItem>
                    <MenuItem component={<Link to="/demandas " />}> Demandas</MenuItem>
                </SubMenu>

                <SubMenu icon={<FaCalendarAlt/>} label="Eventos">
                    <MenuItem component={<Link to="/novo-evento" />}> Cadastrar Evento</MenuItem>
                    <MenuItem component={<Link to="/eventos " />}> Eventos</MenuItem>
                </SubMenu>

                <MenuItem icon={<FaRegWindowClose/>} onClick={logoutAndRedirect} >Sair</MenuItem>

                
            </Menu>
        </Sidebar>
    </div>
    );
};

export default Sidebars;
