import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

import BtnAddEdit from "../btn/BtnAddEdit.jsx";

const GrupoNovo = ({closeAndRefresh}) => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});

    const createGrupo = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            
            const response = await userFetch.post("/grupo", data);

            if(response.status === 200){
                toast.success("Grupo criada com sucesso");

                closeAndRefresh();
                setLoading(false);
                
                navigate('/grupos');
            }

        } catch (error) {
            setLoading(false);
            console.log('Erro ao cadastrar o grupo' + error);
        }
    }

    return(
        <div className="pag-cadastro">
            <h1 className='title-page'>Novo Grupo</h1>
            
            <div className='form-cadastro'>
            
            <form  onSubmit={createGrupo}>
                <div className="form-row">

                    <div className="form-group col-md">
                        <label htmlFor="nome">Nome*</label>
                        <input type="text" required className="form-control" id="nome" name='nome' onChange={valueInput} />
                    </div>

                </div>

                <BtnAddEdit loading={loading} />
            </form>

            </div>
        </div>
    );
}

export default GrupoNovo;