import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { Link } from "react-router-dom";

import InsereMascara from '../InsereMascara.jsx';

import { IoAddSharp } from "react-icons/io5";

import "../../styles/components/listagem.sass";

const ListaCredor = () => {

    const [termoBusca, setTermoBusca] = useState('');
    const [data, setData] = useState([]);

    const getCredores = async() => {

        try {
            
            const response = await userFetch.get('/credores', {
                params: {
                    termoBusca
                },
            })

            const resp = response.data;
            setData(resp);


        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (termoBusca.length >= 3) {
            getCredores();

        } else if(termoBusca === '') {
            getCredores();
        }
    }, [termoBusca]);

    useEffect(() => {
        getCredores();
    },[]);

    return(

        <div className='listagem-demandas'>
            
            <h1 className='title-page'>Lista de Credores</h1>
            <h2 className='subtitle-page'>Pessoas ou empresas prestadoras de serviços, fornecedores de equipamentos etc.</h2> 

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
                            <input type="text" id='busca' placeholder="Pesquise pelo nome, telefone ou documento" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                        </div>
                    </div>

                    </div>

                    
                    </div>
                </div> 
            </div>

           
            <div  className='btn-add'>
                <Link to={"/novo-credor"}> <button><IoAddSharp /> Novo Credor</button></Link>
            </div>

            {data.length === 0 ? <p className='aviso-sem-dados'>Sem despesas para exibir.</p> : (
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Tipo</th>
                        <th>Documento</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((credor) => (
                            
                        <tr key={credor.IdCredor}>
                            <td> <Link to={`/credor/${credor.IdCredor}`}>{credor.Nome}</Link></td>
                            <td> <InsereMascara tipo='telefone' valor={credor.Telefone}></InsereMascara> </td>
                            <td>{credor.Tipo} </td>
                            <td> <InsereMascara tipo={credor.Tipo === 'Pessoa Física' ? 'cpf' : 'cnpj'} valor={credor.Documento}></InsereMascara> </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>

            )}
        </div>
    )
}

export default ListaCredor;