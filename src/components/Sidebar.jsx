import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

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
  return (
    <div className='sidebar-menu'>
        <Sidebar>
            <Menu>
                <SubMenu  icon={<FaUserAlt/>} label="Apoidores">
                    <MenuItem component={<Link to="/apoiadores" />}> Lista</MenuItem>
                    <MenuItem component={<Link to="/novo-apoiador" />}> Novo</MenuItem>
                    <MenuItem component={<Link to="/aniversariantes" />}> Aniversariantes</MenuItem>
                    <MenuItem component={<Link to="/pendentes" />}> Pendetes</MenuItem>
                </SubMenu>

                <SubMenu icon={<FaChartBar/>} label="Demandas">
                    <MenuItem component={<Link to="/nova-demanda" />}> Cadastrar Nova</MenuItem>
                    <MenuItem component={<Link to="/demandas " />}> Demandas</MenuItem>
                    <MenuItem component={<Link to="/categorias " />}> Categorias</MenuItem>
                    <MenuItem component={<Link to="/nova-categoria" />}>Nova Categorias</MenuItem>
                </SubMenu>

                <SubMenu icon={<FaCalendarAlt/>} label="Eventos">
                    <MenuItem component={<Link to="/novo-evento" />}> Cadastrar Evento</MenuItem>
                    <MenuItem component={<Link to="/eventos " />}> Eventos</MenuItem>
                </SubMenu>

                <MenuItem  icon={<FaRegWindowClose/>}>Sair</MenuItem>

                
            </Menu>
        </Sidebar>
    </div>
    );
};

export default Sidebars;
