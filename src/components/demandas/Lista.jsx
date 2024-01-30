import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaChevronDown, FaTrashCan } from "react-icons/fa6";

import { IoAddSharp } from "react-icons/io5";

import "../../styles/components/listagem.sass";

import DeleteClick from '../DeleteClick.jsx';


const DemandasList = () => {

    const [termoBusca, setTermoBusca] = useState('');
    const [data, setData] = useState([]);
    const [situacoes, setSituacoes] = useState([]); 
    const [apoiadoresData, setApoiadoresData] = useState([]);

    

    useEffect(() => {
        getDemandas();
        situacaoDemanda();
        getApoiador();
    }, []);

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

    useEffect(() => {
        if (termoBusca.length >= 3) {
            getDemandas();

        } else if(termoBusca === ''){
            getDemandas();
        }
    }, [termoBusca]);

    const getApoiador = async () => {
        try {
          const apoiadoresIds = data.map((demanda) => demanda.Apoiador);
          const uniqueApoiadoresIds = [...new Set(apoiadoresIds)]; // Remove IDs duplicados
      
      
          const response = await userFetch.get(`/apoiadores`, {
            params: {
              ids: uniqueApoiadoresIds.join(','), // Envie os IDs como uma string separada por vírgulas
            },
          });
      
          const apoiadoresData = response.data;
        
          setApoiadoresData(apoiadoresData);
        } catch (error) {
          console.log(`Erro ao buscar dados dos apoiadores: ${error}`);
        }
    };
      

    const getApoiadorName = (apoiadorId) => {
       
        const apoiador = apoiadoresData.find((ap) => ap.IdApoiador === apoiadorId);
        return apoiador ? apoiador.Nome : 'Apoiador Desconhecido';
    };
      


    const situacaoDemanda = async() => {

        try {
            
            const response = await userFetch.get('/situacao-demandas');
            const data = response.data;
           
            setSituacoes(data);

        } catch (error) {
            
        }
    }

    const mudaSituacao = async(id, idStatus, status) => {
        try {
            
           
            const data = {'situacao': idStatus} // 5 pois é o id da situacao concluida
            await userFetch.put(`/muda-situacao-demanda/${id}`, data);

            toast.success('Situação da demanda alterada');

            setData((prevDemandas) => {
                const updatedDemandas = prevDemandas.map((demanda) =>
                  demanda.IdDemanda === id ? { ...demanda, DemandaSituaco: { Descricao: status } } : demanda
                );
                return updatedDemandas;
              });
            

        } catch (error) {
            console.log(`Não foi possível alterar a situação da demanda: ${error}`);
        }
    }

    const deletaDemanda = async(id) => {
        try {
            
            const response = await userFetch.delete(`demandas/${id}`);
            if(response.status === 200){
                navigate('/demandas');
                toast.success('Demanda removida com sucesso');
            }

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
                            <input type="text" id='busca' placeholder="Pesquise por nome, e-mail, telefone, cidade ou qualquer outro dado disponível." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                        </div>
                    </div>

                    </div>

                    
                    </div>
                </div>
               
            </div>
            
                    
            <div className='btn-add'>
                <Link to={"/nova-demanda"}> <button><IoAddSharp /> Nova Demanda</button></Link>
            </div>


            {data.length === 0 ? <p className='aviso-sem-dados'>Sem demandas para exibir.</p> : (
            <table>
                <thead>
                    <tr>
                        <th>Assunto</th>
                        <th>Situacao</th>
                        <th className='ocultar-1'>Categoria</th>
                        <th>Apoiador</th>
                        <th className='ocultar-0'>Data de Abertura</th>
                        <th className='ocultar-1'>Ações</th>
                    </tr>
                </thead>

                <tbody>
                        
                        {data.map((demanda) => (
                            
                            <tr key={demanda.IdDemanda}>
                                <td> <Link to={`/demandas/${demanda.IdDemanda}`}>{demanda.Assunto}</Link></td>
                                <td>{demanda?.DemandaSituaco?.Descricao}</td>
                                <td className='ocultar-1'>{demanda?.DemandaCategoria?.Descricao}</td>
                                {apoiadoresData.length > 0 && <td>{getApoiadorName(demanda?.Apoiador)}</td>}
                                <td className='ocultar-0'>{formataData(demanda?.Data)}</td>
                                <td>

                                    <a class="btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FaChevronDown />
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <p className='titulo-dropdown'>Troca de Status</p>
                                    {situacoes.map((sit) => (
                                        <a className="dropdown-item btn-acao btn-atendimento" href="#" onClick={() => mudaSituacao(demanda?.IdDemanda, sit.IdSituacao, sit.Descricao)}>{sit.Descricao}</a>
                                    ))}
                                        
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item btn-acao btn-excluir" href="#" onClick={(e) => DeleteClick(e,deletaDemanda(demanda?.IdDemanda))}><FaTrashCan /> Excluir</a>
                                       
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