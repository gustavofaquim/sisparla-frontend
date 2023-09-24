import Sidebar from "./components/Sidebar.jsx";


import './styles/App.css'

function App() {
  
  return (
    <div className="app">
      
      <Sidebar />

      <div className="content">
        <h1>Conteúdo Principal</h1>
      </div>

    </div>
  )
}

export default App
