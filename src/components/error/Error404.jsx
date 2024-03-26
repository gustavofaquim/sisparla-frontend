import { Link } from 'react-router-dom';


import "../../styles/components/error.sass";

import { 
    FaHouseUser
  } from 'react-icons/fa';


const Error404 = () => {

   return(

    <div className='pag-error'>

        <h3>Página Não Encontrada</h3>
        <p className="titulo">Você tentou acessar uma página que não existe ou que não está disponível no momento.</p>
        <h2>404</h2>

        <Link to="/"><button className="btn btn-primary btn-add"><FaHouseUser/> Voltar para o início</button></Link>

    </div>
    

   )

}

export default Error404;