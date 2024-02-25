import * as React from 'react';

import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { toast } from 'react-toastify';

import DeleteClick from '../DeleteClick.jsx';

import { useNavigate, useParams } from "react-router-dom";



const DespesasEdit = ({closeAndRefresh, IdUpdate, modalOpen }) => {

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();


    const [origens, setOrigens] =  useState([]);
    const [tipos, setTipos] = useState([]);

    const [data, setData] = useState([]); 
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});

    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [dataAtual, setDataAtual] = useState(getFormattedDate());

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    const getDespesa = async() => {
       
        try {
            
            if(IdUpdate === undefined){
                console.log('Despesa não encontrada');
                return;
            }
            
            const response =  await userFetch.get(`/despesas/${IdUpdate}`)
           
            setData(response.data)

            setSelectedOption({
                label: response.data?.CredorDespesa.Nome,
                value: response.data?.CredorDespesa.IdCredor
            });
           

        } catch (error) {
            console.log('Erro ao recuperar a despesa.')
        }
    }


    const getOrigem = async() => {
        try {
            
            const response = await userFetch.get('/origens-despesas');
            const data = response.data;
            setOrigens(data);

        } catch (error) {
            console.log('Erro ao listar as origens');
        }
    }

    const getTipo = async() => {
        try {
            
            const response = await userFetch.get("/tipos-despesas");
            const data = response.data;
            setTipos(data);

        } catch (error) {
            console.log('Erro ao listar os tipos');
            toast.error("Houve um erro listar os tipos");
        }3000
    }


    const getCredor = async(inputValue) => {
        

        try {
            
            if(inputValue?.length >= 4){
                const response = await userFetch.get("/credores", {
                    params: {
                        inputValue
                    },
                });

                const data = response.data;
                
                const formattedOptions = data.map(option => ({
                    value: option.IdCredor, 
                    label: option.Nome, 
                }));

                setOptions(formattedOptions);
                
            }else{
                
                setOptions([]);
            }
            
        } catch (error) {
            console.log(`Erro ao listar as pessoas: ` + error);
        }
    }


    const upateDespesa = async(e) => {
        e.preventDefault();

        try {
            
            const dataToSend = { ...data, Credor: selectedOption.value, dataDespesa: dataAtual };
            const respose = await userFetch.put(`despesa/${IdUpdate}`, dataToSend)

            if(respose.status === 200){
                toast.success('Despesa atualizada com sucesso');

                closeAndRefresh();

                navigate('/despesas');

            }
        } catch (error) {
            console.log(`Erro ao atualizar : ` + error);
        }
    }


    useEffect(() => {
        getCredor();
    },[inputValue]);

    useEffect(() => {
        if (modalOpen && IdUpdate !== undefined) {
            getOrigem();
            getTipo();
            getDespesa();
        }
    },[modalOpen, IdUpdate]);


    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };


    const deleteDespesa = async(e) => {
        e.preventDefault();

        try {
            
            const response = await userFetch.delete(`/despesa/${IdUpdate}`)
            
            if(response.status === 200){
                closeAndRefresh();
                navigate('/despesas');
            }
        } catch (error) {
            console.log(`Erro: ` + error);
        }

    }



    return(
        <div className="pag-cadastro">
             <h1 className='title-page'>Atualizar Despesa</h1>
             <h2 className='subtitle-page'>Altere informações da despesa.</h2>


            <div className='form-cadastro'>

                <form onSubmit={upateDespesa}>

                    <p className='form-session-title'></p>
                    
                    <div className="form-row">

                        <div className="form-group col-md">
                            <label htmlFor="descricao">Descricao</label>
                            <input type="text" required className="form-control" id="descricao" name='Descricao'  value={data.Descricao} onChange={valueInput} />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group col-md">
                            <label htmlFor="detalhamento">Detalhamento</label>
                            <textarea className="form-control" name='Detalhamento' value={data.Detalhamento} onChange={valueInput} id="detalhamento"></textarea>
                        </div>

                    </div>


                    <div className="form-row">
                        
                        <div className="form-group  col-md-8">
                            <label htmlFor="valor">Credor*</label>
                            <Select
                                value={selectedOption}
                                onInputChange={(value) => {
                                    setInputValue(value);
                                    getCredor(value);
                                }}
                                onChange={handleChange}
                                options={options}
                                isSearchable={true}
                                placeholder="Selecione uma opção..."
                                className="custom-pessoa"
                                noOptionsMessage={() => "Nenhuma opção encontrada"}
                        
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="valor">Valor*</label>
                            <input type="number" name="Valor" className="form-control" id="valor" value={data.Valor} onChange={valueInput} />
                        </div>

                    </div> 

                

                    <div className="form-row">

                        <div className="form-group col-md">
                            
                            <label htmlFor="categoria">Origem*</label>
                            <select id="origem" required className="form-control" name="Origem" onChange={valueInput}>
                                <option selected value="" disabled>Escolher...</option>
                                {
                                    origens.map((ori) => (
                                        <option key={ori.IdOrigem} selected={data.Origem == ori.IdOrigem} value={ori.IdOrigem}> {ori.Descricao} </option>
                                    ))
                                }
                            </select>

                        </div>

                        <div className="form-group col-md">
                            
                            <label htmlFor="categoria">Tipos*</label>
                            <select id="tipo" required className="form-control" name="Tipo" onChange={valueInput}>
                                <option selected value="" disabled>Escolher...</option>
                                {
                                    tipos.map((tip) => (
                                        <option key={tip.IdTipo} selected={data.Tipo == tip.IdTipo} value={tip.IdTipo}> {tip.Descricao} </option>
                                    ))
                                }
                            </select>

                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="data">Data</label>
                            <input type="date" required id='dataDespesa' className="form-control" name='Data' onChange={valueInput} value={data.Data} />
                        </div>

                    </div>
                    

                    

                    <div className='div-buttons'>
                        <button type="submit" className="btn btn-cadastrar">Salvar</button>
                        <button onClick={(e) => DeleteClick(e,deleteDespesa)}  className="btn btn-excluir">Excluir</button>
                    </div>
                    
                </form>

                

            </div>
        </div>
    )
}

export default DespesasEdit;