import Header from "./components/Header.jsx";
import { Outlet } from 'react-router-dom';


import './styles/app.sass'

function App() {
  
  return (
    <div className="app">
      
      <Header />

      <div className="main">
       <div className="content">
          <Outlet />
       </div>
        
      </div>

    </div>
  )
}

export default App
