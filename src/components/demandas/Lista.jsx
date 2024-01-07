import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaChevronDown, FaTrashCan } from "react-icons/fa6";


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

            toast.success('Situação da demanda alterada');
            

        } catch (error) {
            console.log(`Não foi possível alterar a situação da demanda: ${error}`);
        }
    }

    const deletaDemanda = async(id) => {
        try {
            
            const response = await userFetch.delete(`demandas/${id}`);
            toast.success('Demanda removida com sucesso');

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

            {data.length === 0 ? <p className='aviso-sem-dados'>Sem demandas para exibir.</p> : (
            <table>
                <thead>
                    <tr>
                        <th>Assunto</th>
                        <th>Situacao</th>
                        <th className='ocultar-1'>Categoria</th>
                        <th className='ocultar-0'>Data de Abertura</th>
                        <th className='ocultar-1' id='th-acao'>Ações</th>
                    </tr>
                </thead>

                <tbody>
                        
                        {data.map((demanda) => (
                            <tr key={demanda.IdDemanda}>
                                <td> <Link to={`/demandas/${demanda.IdDemanda}`}>{demanda.Assunto}</Link></td>
                                <td>{demanda?.DemandaSituaco?.Descricao}</td>
                                <td className='ocultar-1'>{demanda?.DemandaCategoria?.Descricao}</td>
                                <td className='ocultar-0'>{formataData(demanda?.Data)}</td>
                                <td>

                                    <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FaChevronDown />
                                    </a>

                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item btn-acao btn-concluir" href="#" onClick={() => mudaSituacao(demanda?.IdDemanda)}>Concluir</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item btn-acao btn-excluir" href="#" onClick={() => deletaDemanda(demanda?.IdDemanda)}><FaTrashCan /> Excluir</a>
                                       
                                    </div>

                                   
                                </td>
                               
                            </tr>
                        
                        ))}       
                </tbody>
            </table>
            )}

        </div>


    );
}

export default DemandasList;