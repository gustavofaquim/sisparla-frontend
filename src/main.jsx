import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import "./styles/main.sass";

//Paginas
import ApoiadoresList from './components/ApoiadoresList.jsx';
import ApoiadoresNovo from './components/ApoiadoresNovo.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children:[
      {
        path: "/apoiadores",
        element: <ApoiadoresList />
      },
      {
        path: "/novo-apoiador",
        element: <ApoiadoresNovo />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
