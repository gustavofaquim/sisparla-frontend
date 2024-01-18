import * as React from 'react';

import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';
import { toast } from 'react-toastify';

import { FaRegFloppyDisk } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";


const DespesasEdit = () => {

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();


    const [data, setData] = useState([]); 
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});


    const getDespesas = async() => {

        try {
            
            if(id === undefined){
                console.log('Despesa não encontrada');
                return;
            }

            await userFetch(`/despesas/${id}`)
                .then((response) => {
                    setData(response.data)
                })
                .catch((error) => {
                    if(error.response){
                        console.log(error.response.data.msg);
                    }else{
                        console.log('API não respondeu');
                    }
                })

        } catch (error) {
            console.log('Erro ao recuperar a despesa.')
        }
    }

    useEffect(() => {
        getDespesas();
    },[]);


    return(
        <div className="cadastar-demanda">
             <h1 className='title-page'>Atualizar Despesa</h1>
             <h2 className='subtitle-page'>Altere informações da despesa.</h2>


             <div className='form-demanda'>

                <form >

                <p className='form-session-title'></p>
                
                <div class="form-row">

                    <div class="form-group col-md-7">
                        <label htmlFor="assunto">Assunto</label>
                        <input type="assunto" required class="form-control" id="assunto" name='assunto' placeholder="Assunto" value={data.assunto} onChange={valueInput} />
                    </div>

                </div>

                <div class="form-row">

                    
                    <div class="form-group col-md-7">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea className="form-control" name='descricao' value={data.descricao} onChange={valueInput} id="descricao"></textarea>
                    </div>

                    
                </div>


                <div class="form-row">


                    <div class="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" required class="form-control" name="idCategoria" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                           
                        </select>

                     
                    </div>


                    <div class="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" required class="form-control" name="idSituacao" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                           
                        </select>
                    </div>

                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label htmlFor="responsavel">Responsável</label>
                        <select id="responsavel" class="form-control" name="idResponsavel" onChange={valueInput}>
                          
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    
                    <div class="form-group">
                        <p>Emanda Parlamentar ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarS" value="S" checked={data.emendaParlamentar == "S"} onChange={valueInput} />
                            <label class="form-check-label" for="emendaParlamentarS">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarN" value="N" checked={data.emendaParlamentar != "S"} onChange={(e) => setEmendaParlamentar(e.target.value)} />
                            <label class="form-check-label" for="emendaParlamentarN">Não</label>
                        </div>
                    </div>

                    
                    <div class="form-group">
                        <label htmlFor="valor">Valor Estimado</label>
                        <input type="number" name="valor" id="valor" value={data.valor} onChange={valueInput} />
                    </div>

                </div>

                <div className='btn'>
                    <button type="submit" class="btn btn-primary btn-cadastrar"> {<FaRegFloppyDisk />} Atualizar Despesas</button>
                </div>
                


                </form>

             </div>
        </div>
    )
}

export default DespesasEdit;