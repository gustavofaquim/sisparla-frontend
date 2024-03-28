
import { Link } from 'react-router-dom';

import "../../styles/components/error.sass";

import { 
    FaHouseUser
  } from 'react-icons/fa';


const SemPermissao = () => {

   return(

    <div className='pag-error'>

        <h3>Página Não Disponível</h3>
        <p className="titulo"> Você não possui permissão para acessar esse recurso, entre em contato com o administrador do sistema.</p>
        <h2>401</h2>

        <Link to="/"><button className="btn btn-primary btn-add"><FaHouseUser/> Voltar para o início</button></Link>

    </div>
    

   )

}

export default SemPermissao;