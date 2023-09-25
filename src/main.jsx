import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

//Paginas
import ApoiadoresList from './components/ApoiadoresList.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children:[
      {
        path: "/",
        element: <ApoiadoresList />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
