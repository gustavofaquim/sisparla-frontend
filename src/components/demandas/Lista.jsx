import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import "../../styles/components/listagem.sass";

const DemandasList = () => {

    const [termoBusca, setTermoBusca] = useState('');
    const [data, setData] = useState([]);

    

    useEffect(() => {
        getDemandas();
    }, [termoBusca]);

    const getDemandas = async() => {
        
        try {
            
            const response = await userFetch.get('/demandas', {
                params: {
                    termoBusca
                },
            })

            const resp = response.data;
            setData(resp);


        } catch (error) {
            console.log(`Erro ao listar as demandas ${error}`);
        }
    }

    function formataData(dataString) {
        
        const data = new Date(`${dataString}T00:00:00-03:00`);
       
        // Verificando se a conversão foi bem-sucedida
        if (isNaN(data.getTime())) {
            return '-----';
        }

    
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
      
        return `${dia}/${mes}/${ano}`;
    }



    return(

        <div className='listagem-demandas'>

            <h1 className='title-page'>Lista de Demandas</h1>
            <h2 className='subtitle-page'></h2>


            <div className="filtro-busca">
                <div>
                   
                    <input type="text" name="termoBusca" placeholder="🔎 Digite um termo de busca" style={{ paddingLeft: '20px' }} value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} />
                    
                </div>
            </div>


            <table>
                <thead>
                    <tr>
                        <th>Assunto</th>
                        <th>Categoria</th>
                        <th>Situacao</th>
                        <th>Data de Abertura</th>
                    </tr>
                </thead>

                <tbody>
            
                    {data.length === 0 ? <p>Carregando...</p> : (
                        data.map((demanda) => (
                            <tr key={demanda.IdDemanda}>
                                <td> <Link to={`/demandas/${demanda.IdDemanda}`}>{demanda.Assunto}</Link></td>
                                <td>{demanda?.DemandaSituaco?.Descricao}</td>
                                <td>{demanda?.DemandaCategoria?.Descricao}</td>
                                <td>{formataData(demanda?.Data)}</td>
                            </tr>
                        
                        ))
                    )}
                </tbody>
            </table>

        </div>


    );
}

export default DemandasList;