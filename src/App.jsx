import { useState } from 'react';

import Header from "./components/Header.jsx";
import { Outlet } from 'react-router-dom';


import './styles/app.sass'

function App() {
  
  return (
    <div className="app">
      <div className='main'>
       
       <div className='header'>
        <Header />
       </div>
        
        <div className="content">
          <Outlet />
        </div>

        
      </div>
     

    </div>
  )
}

export default App
