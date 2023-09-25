import React, { useState } from 'react';
import '../styles/components/sidebar-item.sass';

const SidebarItem = ({ Icon, Text, Link, Subitems }) => {
  const [subitemsVisible, setSubitemsVisible] = useState(false);

  const toggleSubitems = (e) => {
    e.stopPropagation(); // Impede que o evento de clique se propague para os elementos pai
    setSubitemsVisible(!subitemsVisible);
  };

  if (Link) {
    return (
      <a href={Link} className="sidebar-item">
        <Icon className="icons" />
        <span>{Text}</span>
      </a>
    );
  } else if (Subitems && Subitems.length > 0) {
    return (
      <div className="sidebar-item" onClick={toggleSubitems}>
        <Icon className="icons" />
        <span>{Text}</span>
        <ul className={`subitem-list ${subitemsVisible ? 'visible' : ''}`}>
          {Subitems.map((subitem, index) => (
            <li key={index}>
              <a href={subitem.link}>{subitem.label}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="sidebar-item">
        <Icon className="icons" />
        <span>{Text}</span>
      </div>
    );
  }
};

export default SidebarItem;
