import * as React from 'react';

import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';

import { FaRegFloppyDisk } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";

import "../../styles/components/paginas-cadastros-gerais.sass";

import DeleteClick from '../DeleteClick.jsx';

const relacoes = [
    {"descricao": "Participante"},
    {"descricao": "Organizador"},
    {"descricao": "Patrocinador"},
];


const Edit = () =>{

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const [data, setData] = useState([]); 
    const [dataDoBanco, setDataDoBanco] = useState(""); // Inicialize com uma string vazia

   

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
    }, [])

    useEffect(() => {
        // Atualize o estado da data do banco quando receber a resposta da API
        setDataDoBanco(formatarData(data.DataHorario) || ""); // Use a data do banco de dados como valor inicial
    }, [data]);



    const formatarData = (dataString) => {
        if (!dataString) return "";
        const dataObjeto = new Date(dataString);
        const formatoLocal = new Date(dataObjeto.getTime() - dataObjeto.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        return formatoLocal;
    };

    const valueInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    
        if (e.target.name === "DataHorario") {
          setDataDoBanco(formatarData(e.target.value));
        }
    };




    const editEvento = async(e) => {
        e.preventDefault();

       try {
        
        if(id === undefined){
            console.log('Evento não encontrado');
            return;
        }
        
        const response = await userFetch.put(`/eventos/${id}`, data);

        if(response.status == '200'){
            navigate('/')
        }

       } catch (error) {
        console.log(`Erro ao atualizar evento: ${error}`);
       }
    }

    const deleteEvento = async() => {
        try {
            
            const response = await userFetch.delete(`/evento/${id}`);

            if(response.status === 200){
                navigate('/eventos');
            }
        } catch (error) {
            console.log(`Error: ` + error)
        }
    }

    return(
        <div className="pag-cadastro">
            <h1 className='title-page'>Novo Evento</h1>
            <h2 className='subtitle-page'>Cadastre um novo evento.</h2>

            <div className='form-cadastro'>
                <form  onSubmit={editEvento}>


                    <div className="form-row">

                        <div className="form-group col-md-7">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" required className="form-control" id="nome" name='Nome' placeholder="Nome" value={data.Nome}  onChange={valueInput} />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md-7">
                            <label htmlFor="descricao">Descrição</label>
                            <textarea className="form-control" name='Descricao' onChange={valueInput} id="descricao" value={data.Descricao}></textarea>
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
                            <input type="text" required className="form-control" id="local" name='Local' placeholder="Endereço do evento" value={data.Local} onChange={valueInput} />
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="dataHorario">Data e Horário</label>
                            <input type="datetime-local" required className="form-control" id="dataHorario" name='DataHorario' value={dataDoBanco} placeholder="Data e Horário do evento"  onChange={valueInput} />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md-5">
                            <label htmlFor="relacao">Relação</label>
                            <select name="Relacao" id="relacao" onChange={valueInput} required className="form-control" value={data.Relacao} >
                                <option selected value="" disabled>Escolher...</option>
                                {
                                relacoes.map((rel) => (
                                    <option value={rel.descricao} selected={rel.descricao === data.Relacao}  > {rel.descricao} </option>
                                ))
                            }
                            </select>

                        </div>

                    </div>
                    
                    <div className='div-buttons'>
                        <button type="submit" className="btn btn-cadastrar" >Salvar</button>
                        <button onClick={(e) => DeleteClick(e,deleteEvento)} className="btn btn-excluir">Excluir</button>
                    </div>




                </form>
            </div>
        </div>
    )

}

export default Edit;

