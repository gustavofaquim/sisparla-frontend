import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";


const Novo = ({ openModal, updateListaEventos }) => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});

    const createEvento = async(e) => {
        e.preventDefault();

        try {
            
           const response = await userFetch.post("/eventos", data);

           if(response.status == '200'){
                toast.success('Evento cadastrado com sucesso');

                updateListaEventos();
                openModal();
                navigate('/eventos');
            }

        } catch (error) {
            console.log(`Erro ao cadastrar o evento : ${error}`);
        }
    }   

    return(
        <div className="pag-cadastro">
            <h1 className='title-page'>Novo Evento</h1>
            <h2 className='subtitle-page'>Cadastre um novo evento.</h2>

            <div className='form-cadastro'>
                <form  onSubmit={createEvento}>


                    <div className="form-row">

                        <div className="form-group col-md">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" required className="form-control" id="nome" name='nome' placeholder="Nome"  onChange={valueInput} />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md">
                            <label htmlFor="nome">Descrição</label>
                            <textarea name='descricao' className="form-control" onChange={valueInput} id="descricao"></textarea>
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md">
                            <label htmlFor="nome">Responsável</label>
                            <input type="text" required className="form-control" id="responsavel" name='responsavel' placeholder="Responsavel"  onChange={valueInput} />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md">
                            <label htmlFor="local">Local do Evento</label>
                            <input type="text" required className="form-control" id="local" name='local' placeholder="Endereço do evento"  onChange={valueInput} />
                        </div>


                    </div>

                    <div className="form-row">

                    <div className="form-group col-md-4">
                            <label htmlFor="dataHorario">Data e Horário</label>
                            <input type="datetime-local" required className="form-control" id="dataHorario" name='dataHorario' placeholder="Data e Horário do evento"  onChange={valueInput} />
                    </div>

                        <div className="form-group col-md">
                            <label htmlFor="relacao">Relação</label>
                            <select name="relacao" id="relacao" onChange={valueInput} required className="form-control" >
                                <option selected value="" disabled>Escolher...</option>
                                <option value="Participante">Participante</option>
                                <option value="Organizador">Organizador</option>
                                <option value="Patrocinador">Patrocinador</option>
                            </select>

                        </div>

                    </div>

                    <div>
                        <button type="submit" className="btn btn-cadastrar">Salvar</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Novo;