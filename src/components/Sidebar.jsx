import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const Sidebars = () => {
  return (
    <Sidebar>
        <Menu>
            <SubMenu prefix="🔥" label="Apoidores">
                <MenuItem component={<Link to="/apoiadores" />}> Lista</MenuItem>
                <MenuItem component={<Link to="/novo-apoiador" />}> Novo</MenuItem>
                <MenuItem component={<Link to="/aniversariantes" />}> Aniversariantes</MenuItem>
            </SubMenu>

            <SubMenu label="Demandas">
                <MenuItem> Google maps</MenuItem>
                <MenuItem> Open street maps</MenuItem>
            </SubMenu>

            <SubMenu label="Theme">
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
            </SubMenu>
        </Menu>
    </Sidebar>
    );
};

export default Sidebars;
