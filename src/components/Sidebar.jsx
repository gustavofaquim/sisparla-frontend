import React from 'react'

import  '../styles/components/sidebar.sass';

import { 
  FaTimes, 
  FaHome, 
  FaEnvelope, 
  FaRegSun, 
  FaUserAlt, 
  FaIdCardAlt, 
  FaRegFileAlt,
  FaRegCalendarAlt,
  FaChartBar
} from 'react-icons/fa';



import SidebarItem from './SidebarItem';


const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }


  const menuItems = [
    {
      label: 'Home',
      icon: FaHome,
      subitems: [],
    },
    {
      label: 'Apoiadores',
      icon: FaChartBar,
      subitems: [
      {
        label: 'Novo Apoiador'
      },
      {
        label: 'Lista Apoiadores'
      }],
    },
    {
      label: 'Users',
      icon: FaUserAlt,
      subitems: [
        {
          label: 'User 1',
          link: '/user1',
        },
        {
          label: 'User 2',
          link: '/user2',
        },
      ],
    },
  ]


  return (
    <div sidebar={active} className="sidebar">
      
      <FaTimes onClick={closeSidebar} />

      <div className="container-sidebar-item">
        {menuItems.map((menuItem, index) => (
          <SidebarItem key={index} Icon={menuItem.icon} Text={menuItem.label} Subitems={menuItem.subitems}>
          </SidebarItem> 
          
        ))}
      </div>
      
    </div>
  )
}

export default Sidebar