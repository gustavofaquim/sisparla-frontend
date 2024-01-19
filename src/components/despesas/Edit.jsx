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
        <div className="pag-cadastro">
             <h1 className='title-page'>Atualizar Despesa</h1>
             <h2 className='subtitle-page'>Altere informações da despesa.</h2>


             <div className='form-cadastro'>

                <form >

                <p className='form-session-title'></p>
                
                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="descricao">Descricao</label>
                        <input type="text" required className="form-control" id="descricao" name='descricao'  value={data.descricao} onChange={valueInput} />
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="detalhamento">Detalhamento</label>
                        <textarea className="form-control" name='detalhamento' value={data.detalhamento} onChange={valueInput} id="detalhamento"></textarea>
                    </div>

                </div>


                <div className="form-row">
                   
                    <div className="form-group">
                        <label htmlFor="valor">Valor*</label>
                        <input type="number" name="valor" className="form-control" id="valor" value={data.valor} onChange={valueInput} />
                    </div>
                </div>

                <div className="form-row">
                    
                    <div className="form-group  col-md-5">
                        <label htmlFor="valor">Pessoa Fisica ou Juridica*</label>
                        <Select
                            value={selectedOption}
                            onInputChange={(value) => {
                                setInputValue(value);
                                getPessoaDespesa(value);
                            }}
                            onChange={handleChange}
                            options={options}
                            isSearchable={true}
                            placeholder="Selecione uma opção..."
                            className="custom-pessoa"
                            noOptionsMessage={() => "Nenhuma opção encontrada"}
                     
                        />
                    </div>

                </div> 

             

               
                </div>

                <div className='btn'>
                    <button type="submit" className="btn btn-primary btn-cadastrar"> {<FaRegFloppyDisk />} Atualizar Despesas</button>
                </div>
                


                </form>

             </div>
        </div>
    )
}

export default DespesasEdit;