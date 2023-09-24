import React, { useState } from 'react';
import { Link } from "react-router-dom";

import "../styles/components/sidebar.sass"



const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='head'>

            <div className={`page-wrapper ${isOpen ? 'open' : ''}`}>
                <button className="hamburger" onClick={toggleSidebar}> 
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
            </div>
            
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                {/* Adicione aqui os links do menu */}
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
                <li><a href="#">Item 3</a></li>
                </ul>
            </div>
            
        </div>
        
    );
};

export default Sidebar;