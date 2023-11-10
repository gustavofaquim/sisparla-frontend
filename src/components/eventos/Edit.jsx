import * as React from 'react';

import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';

import { FaRegFloppyDisk } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";


const Edit = () =>{

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const [data, setData] = useState([]); 

    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});
    

    const getEvento = async() => {
        try {
            
            if(id === undefined){
                console.log('Evento não encontrado');
                return;
            }

            await userFetch(`/eventos/${id}`)
                .then((response) => {
                    setData(response.data)
                    
                })
                .catch((error) => {
                    if(error.response){
                        console.log(error.response.data.msg)
                    }else{
                        console.log("API não respondeu");
                    }
                })

        } catch (error) {
            console.log(`Erro ao recuperar o evento ${error}`)
        }
    }

    useEffect(() => {
        getEvento();
    })


    const editEvento = async(e) => {
        e.preventDefault();

       try {
        
        const response = await userFetch.put(`/eventos/${id}`, data);

        if(response.status == '200'){
            nagivate('/')
        }

       } catch (error) {
        console.log(`Erro ao atualizar evento: ${error}`);
       }
    }

    return(
        <div className="cadastar-evento">
            <h1 className='title-page'>Novo Evento</h1>
            <h2 className='subtitle-page'>Cadastre um novo evento.</h2>

            <div className='form-evento'>
                <form  onSubmit={editEvento}>


                    <div className="form-row">

                        <div className="form-group col-md-7">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" required className="form-control" id="nome" name='Nome' placeholder="Nome" value={data.Nome}  onChange={valueInput} />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md-7">
                            <label htmlFor="nome">Descrição</label>
                            <textarea name='descricao' onChange={valueInput} id="Descricao" value={data.Descricao}></textarea>
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md-5">
                            <label htmlFor="nome">Responsável</label>
                            <input type="text" required className="form-control" id="responsavel" name='Responsavel' value={data.Responsavel} placeholder="Responsavel"  onChange={valueInput} />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md-7">
                            <label htmlFor="local">Local do Evento</label>
                            <input type="text" required className="form-control" id="local" name='local' placeholder="Endereço do evento" value={data.Local} onChange={valueInput} />
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="dataHorario">Data e Horário</label>
                            <input type="datetime-local" required className="form-control" id="dataHorario" name='DataHorario' value={data.DataHorario} placeholder="Data e Horário do evento"  onChange={valueInput} />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md-5">
                            <label htmlFor="relacao">Relação</label>
                            <select name="relacao" id="relacao" onChange={valueInput} required className="form-control" value={data.Relacao} >
                                <option selected value="" disabled>Escolher...</option>
                                <option value="Participante">Participante</option>
                                <option value="Organizador">Organizador</option>
                                <option value="Patrocinador">Patrocinador</option>
                            </select>

                        </div>

                    </div>

                    <div className='btn'>
                        <button type="submit" class="btn btn-primary btn-cadastrar">Criar Evento</button>
                    </div>




                </form>
            </div>
        </div>
    )

}

export default Edit;

