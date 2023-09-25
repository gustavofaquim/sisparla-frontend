import Header from "./components/Header.jsx";
import { Outlet } from 'react-router-dom';


import './styles/app.sass'

function App() {
  
  return (
    <div className="app">
      
      <Header />

      <div className="content">
        <h1>Conteúdo Principal</h1>
        <Outlet />
      </div>

    </div>
  )
}

export default App
