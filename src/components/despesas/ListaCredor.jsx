import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { Link } from "react-router-dom";


import "../../styles/components/listagem.sass";

const ListaCredor = () => {

    const [data, setData] = useState([]);

    const getCredores = async() => {

        try {
            
            const response = await userFetch.get('/credores');

            const resp = response.data;
            setData(resp);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCredores();
    },[]);

    return(

        <div className='listagem-demandas'>
            
            <h1 className='title-page'>Lista de Credores</h1>
            <h2 className='subtitle-page'></h2>


            <div>
                <button><a href="/novo-credor">Novo Credor</a></button>
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
                            <td>{credor.Telefone}</td>
                            <td>{credor.Tipo} </td>
                            <td>{credor.Documento} </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>

            )}
        </div>
    )
}

export default ListaCredor;