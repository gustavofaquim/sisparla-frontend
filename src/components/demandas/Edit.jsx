import * as React from 'react';

import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';

import { FaRegFloppyDisk } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";


const DemandasEdit = () => {
    
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});
    
    
    const [categorias, setCategorias] = useState([]); 
    const [responsaveis, setResponsaveis] = useState([]);
    const [situacoes, setSituacoes] = useState([]); 


    const [assunto, setAssunto] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [situacao, setSituacao] = useState("");
    const [emandaParlamentar, setEmendaParlamentar] = useState("");
    const [valor, setValor] = useState("");

    const [data, setData] = useState([]); 
    

    const getCategorias = async() => {
        try {
            
            const response = await userFetch('/categorias-demandas');
            const data = response.data;
            setCategorias(data);

        } catch (error) {
            console.log('Erro ao recuperar as categorias de demandas');
        }
    }

    const getSituacoes = async() => {
        try {
            
            const response = await userFetch('/situacao-demandas');
            const data = response.data;
            setSituacoes(data);

        } catch (error) {
            console.log('Erro ao recuperar as situações de demandas');
        }
    }

    const getUsers = async() => {
        try {
            const response = await userFetch("/lista-usuarios");
            const data = response.data;
            setResponsaveis(data);
        } catch (error) {
            console.log('Erro ao recuperar os usuários');
        }
    }


    const getDemanda = async() => {
        try {
            
          if(id === undefined){
            console.log('Demanda não encontrada');
            return;
          }

          await userFetch(`/demandas/${id}`)
            .then((response) => {
                setData(response.data)
                console.log(response.data);
            })
            .catch((error) => {

                if(error.response){
                    console.log(error.response.data.msg);
                }else{
                    console.log("API não respondeu");
                }
            })

        } catch (error) {
            console.log(`Erro au recuperar a demanda ${error}`);
        }
    };

    useEffect(() => {
        getCategorias();
        getSituacoes();
        getUsers();
        getDemanda();
    },[]);


    const editDemanda = async(e) => {
        e.preventDefault();

        try {
            
            const response = await userFetch.put(`/demandas/${id}`, data);
            

            if(response.status == '200'){
                navigate('/');
            }
            

        } catch (error) {
            console.log('Erro ao cadastrar a demanda:' + error);
        }
    }


    return(
        <div className="cadastar-demanda">
             <h1 className='title-page'>Atualizar Demanda</h1>
             <h2 className='subtitle-page'>=</h2>


             <div className='form-demanda'>

                <form  onSubmit={editDemanda}>

                <p className='form-session-title'></p>
                
                <div class="form-row">

                    <div class="form-group col-md-7">
                        <label htmlFor="assunto">Assunto</label>
                        <input type="assunto" required class="form-control" id="assunto" name='assunto' placeholder="Assunto" value={data.Assunto} onChange={valueInput} />
                    </div>

                </div>

                <div class="form-row">

                    
                    <div class="form-group col-md-7">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea name='descricao' value={data.Descricao} onChange={valueInput} id="descricao"></textarea>
                    </div>

                    
                </div>

                <div class="form-row">


                    <div class="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" required class="form-control" name="idCategoria" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                categorias.map((cat) => (
                                    <option key={cat.IdCategoria}  selected={cat.IdCategoria === data?.DemandaCategoria?.IdCategoria}  value={cat.IdCategoria}   > {cat.Descricao} </option>
                                ))
                            }
                        </select>

                     
                    </div>


                    <div class="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" required class="form-control" name="idSituacao" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                situacoes.map((sit) => (
                                    <option key={sit.IdSituacao} value={sit.IdSituacao} selected={sit.IdSituacao === data?.DemandaSituaco?.IdSituacao}  > {sit.Descricao} </option>
                                ))
                            }
                        </select>
                    </div>

                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label htmlFor="responsavel">Responsável</label>
                        <select id="responsavel" class="form-control" name="idResponsavel" onChange={valueInput}>
                            <option selected>Escolher...</option>
                            {
                                responsaveis.map((resp) => (
                                    <option key={resp.IdUsuario} value={resp.IdUsuario}  selected={resp.IdUsuario === data?.DemandaResponsavel?.IdUsuario} > {resp.Nome} </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    
                    <div class="form-group">
                        <p>Emanda Parlamentar ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarS" value="S" checked={data.EmendaParlamentar == "S"} onChange={valueInput} />
                            <label class="form-check-label" for="emendaParlamentarS">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarN" value="N" checked={data.EmendaParlamentar != "S"} onChange={(e) => setEmendaParlamentar(e.target.value)} />
                            <label class="form-check-label" for="emendaParlamentarN">Não</label>
                        </div>
                    </div>

                    
                    <div class="form-group">
                        <label htmlFor="valor">Valor Estimado</label>
                        <input type="number" name="valor" id="valor" />
                    </div>

                </div>

                <div className='btn'>
                    <button type="submit" class="btn btn-primary btn-cadastrar"> {<FaRegFloppyDisk />} Cadastrar Demanda</button>
                </div>
                


                </form>

             </div>
        </div>
    )
}

export default DemandasEdit;