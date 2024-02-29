import DeleteClick from '../DeleteClick';

import { FaTrash, FaSave  } from "react-icons/fa";

const BtnAddEdit = ({isEdit, loading, funcaoDelete}) => {

    if(isEdit){
        return (
            <div className='div-buttons'>
                <button type="submit" className={loading ? 'btn btn-cadastrar button-loading' : 'btn btn-cadastrar'} disabled={loading}><FaSave /> {loading ? 'Salvando Aguarde...' : 'Salvar'}</button>
                <button onClick={(e) => DeleteClick(e, funcaoDelete)}  className="btn btn-excluir"><FaTrash /> Excluir</button>
            </div>
        )
    }else{
        return (
            <div className='div-buttons'>
                <button type="submit" className={loading ? 'btn btn-cadastrar button-loading' : 'btn btn-cadastrar'} disabled={loading}><FaSave /> {loading ? 'Salvando Aguarde...' : 'Salvar'}</button>
            </div>
        )
    }
}

export default BtnAddEdit;