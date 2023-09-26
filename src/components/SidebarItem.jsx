import React, { useState } from 'react';
import '../styles/components/sidebar-item.sass';

import {
  FaAngleRight,
  FaAngleDown
}from 'react-icons/fa';


const SidebarItem = ({ Icon, Text, Link, Subitems }) => {
  const [subitemsVisible, setSubitemsVisible] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(false);

  const toggleSubitems = (e) => {
    e.stopPropagation(); // Impede que o evento de clique se propague para os elementos pai
    setSubitemsVisible(!subitemsVisible);
    setArrowRotation(!arrowRotation);
  };

  if (Link) {
    return (
      <a href={Link} className="sidebar-item">
        <Icon className="icons" />
        <span>{Text}</span>
      </a>
    );
  }if (Subitems && Subitems.length > 0) {
    return (
      <div className="sidebar-item" onClick={toggleSubitems}>
        <div className='btn-item'>
          <Icon className="icons" />
          <span>{Text}</span> <FaAngleRight className={`icon-arrow ${arrowRotation ? 'rotate' : ''}`} />
        </div>
        <ul className={`subitem-list ${subitemsVisible ? 'visible' : ''}`}>
          {Subitems.map((subitem, index) => (
            <li key={index}>
              <a href={subitem.link}> {subitem.label} </a>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="sidebar-item">
        <div className='btn-item'>
          <Icon className="icons" />
          <span>{Text}</span>
        </div>
      </div>
    );
  }
};

export default SidebarItem;
