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

    const mudaSituacao = async(id) => {
        try {
            
            const data = {'situacao': 5} // 5 pois é o id da situacao concluida
            const response = await userFetch.put(`/muda-situacao-demanda/${id}`, data);

            console.log('Deu certo ai zé');
            

        } catch (error) {
            console.log(`Não foi possível alterar a situação da demanda: ${error}`);
        }
    }

    const deletaDemanda = async(id) => {
        try {
            
            const response = await userFetch.delete(`demandas/${id}`);


        } catch (error) {
            console.log(`Não foi possível deletar a demanda: ${error}`);
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
            <h2 className='subtitle-page'>Lista de todas as demandas, com status e data de abertura.</h2>


            <div className="filtro-busca">
                <div>
                   
                    <input type="text" name="termoBusca" placeholder="🔎 Digite um termo de busca" style={{ paddingLeft: '20px' }} value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} />
                    
                </div>
            </div>


            <table>
                <thead>
                    <tr>
                        <th>Assunto</th>
                        <th>Situacao</th>
                        <th>Categoria</th>
                        <th>Data de Abertura</th>
                        <th colspan="2" id='th-acao'>Ações</th>
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
                                <td> 
                                    <span onClick={() => mudaSituacao(demanda?.IdDemanda)} class='btn-acao btn-concluir'>Concluir</span> 
                                </td>
                                <td>
                                    <span onClick={() => deletaDemanda(demanda?.IdDemanda)} class='btn-acao btn-excluir'>Excluir</span>
                                </td>
                            </tr>
                        
                        ))
                    )}
                </tbody>
            </table>

        </div>


    );
}

export default DemandasList;