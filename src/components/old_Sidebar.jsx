import React from 'react'
import { Link } from 'react-router-dom';

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
  FaChartBar,
  FaCalendarAlt,
  FaRegWindowClose
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
      icon: FaUserAlt,
      subitems: [
      {
          label: 'Todos',
          link:  '/apoiadores'
      },
      {
        label: 'Novo Apoiador',
        link: '/novo-apoiador'
      },
      {
        label: 'Aniversariantes',
        link: '/aniversariantes'
      },
      {
        label: 'Pendentes',
        link: '/pendentes'
      }
    ],
    },
    {
      label: 'Demandas',
      icon: FaChartBar,
      subitems: [
        {
          label: 'Cadastrar Nova',
          link: '/nova-demanda',
        },
        {
          label: 'Lista',
          link: '/demandas',
        },
        {
          label: 'Categorias',
          link: '/demandas',
        },
      ],
    },
    {
      label: 'Eventos',
      icon: FaCalendarAlt,
      subitems: [
        {
          label: 'Todos',
          link: '/eventos'
        },{
          label: 'Cadastrar Novo',
          link: '/novo-evento'
        }
      ]
    },
    {
      label: 'Sair',
      icon: FaRegWindowClose,
    }
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