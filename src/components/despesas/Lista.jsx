import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaChevronDown, FaTrashCan } from "react-icons/fa6";
import { IoAddSharp } from "react-icons/io5";


import "../../styles/components/listagem.sass";

const DespesasList = () => {

    const [termoBusca, setTermoBusca] = useState('');
    const [data, setData] = useState([]);

    const getDespesas = async() => {
        
        try {
            
            const response = await userFetch.get('/despesas', {
                params: {
                    termoBusca
                },
            })
            
            const resp = response.data;

            setData(resp);

        } catch (error) {
            console.log(`Erro ao listar despesas: ${error.message}`);
        }
    };

    useEffect(() => {
        if (termoBusca.length >= 3) {
            getDespesas();

        } else if(termoBusca === '') {
            getDespesas();
        }
    }, [termoBusca]);


    useEffect(() => {
        getDespesas();
    },[]);

    return(
        <div className='listagem-demandas'>

        <h1 className='title-page'>Lista de Despesas</h1>
        <h2 className='subtitle-page'>Lista de todas as despesas.</h2>


        <div id="accordion">
            <div className="card">
                <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        🔎 Filtrar Informações
                    </button>
                </h5>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                    
                <div className="filtro-busca">
                    <div>
                        <label htmlFor="busca">Digite um termo para buscar</label>
                        <input type="text" id='busca' placeholder="Pesquise pela descrição, credor ou valor" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                    </div>
                </div>

                </div>

                
                </div>
            </div> 
        </div>


        
        <div className='btn-add'> 
            <Link to={"/nova-despesa"}><button ><IoAddSharp /> Nova Despesa</button></Link>
        </div>
       

        {data.length === 0 ? <p className='aviso-sem-dados'>Sem despesas para exibir.</p> : (
        <table>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Credor</th>
                    <th>Valor</th>
                   
                </tr>
            </thead>

            <tbody>
                    
                    {data.map((despesa) => (
                        
                        <tr key={despesa.IdDespesa}>
                            <td> <Link to={`/despesas/${despesa.IdDespesa}`}> {despesa.Descricao} </Link> </td>
                            <td>{despesa?.CredorDespesa?.Nome} </td>
                            <td> R$ {despesa?.Valor} </td>
                        </tr>
                    
                    ))}       
            </tbody>
        </table>
        )}

    </div>

    );
};

export default DespesasList;