import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from "./components/Header.jsx";

import './styles/app.sass';

const App = ({ isAuthenticated, onLogout }) => {
  console.log('App isAuthenticated:', isAuthenticated);
  return (
    <div className="app">
      
      <Header isAuthenticated={isAuthenticated} />

      <div className="content">
      
        <Outlet />
      </div>
    </div>
  );
};

export default App;
