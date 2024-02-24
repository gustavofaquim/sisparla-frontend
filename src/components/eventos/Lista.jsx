import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { IoAddSharp } from "react-icons/io5";

import Pagination from '../Pagination';
import EventoEdit from "./Edit.jsx";
import EventoNovo from "./Novo.jsx";

import "../../styles/components/listagem.sass";
import "../../styles/components/tabela.sass";
import "../../styles/components/modal.sass";

const Lista = () => {

    const [termoBusca, setTermoBusca] = useState('');
    const [data, setData] = useState([]);



    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDemanda = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        getEventos();
    }, []);


    const getEventos = async() => {

        try {

            const response = await userFetch.get("/eventos", {
                params: {
                    termoBusca
                }
            })

            const resp = response.data;
            setData(resp);

        } catch (error) {
            console.log(`Erro ao listar os eventos ${error}`);
        }
    }

    useEffect(() => {
        if (termoBusca.length >= 3) {
            getEventos();

        } else if(termoBusca === ''){
            getEventos();
        }
    }, [termoBusca]);


    function formataDataEHora(dataString) {
        const data = new Date(dataString);
    
        // Verificando se a conversão foi bem-sucedida
        if (isNaN(data.getTime())) {
            return '-----';
        }
    
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
    
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
    
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    }
    

    const [modalOpen, setModalOpen] = useState(false);
    const [IdEventoAtt, setIdEventoAtt] = useState(null);

    const openModal = () => {
        setModalOpen(true);

        $('#modalCadastraEvento').modal('hide');
    };

    const openAtualizacaoModal = (eventoId) => {
        setModalOpen(true);
        setIdEventoAtt(eventoId);
        
        
        $('#modalAtualizaEvento').modal('hide');
    };

    const closeAndRefresh =  async () => {
        setModalOpen(false);
        
        try {
            // Chamar a função de obtenção dos dados atualizados
            const novosDados = await getEventos(); 
    
            if (novosDados) {
                // Atualizar o estado com os novos dados do apoiador
                setData(novosDados);
            }
        } catch (error) {
            console.error('Erro ao obter os dados atualizados da eventos:', error);
            // Lógica de tratamento de erro, se necessário
        }
    };


    return(
        <div className='listagem-demandas'>
            
            <h1 className='title-page'>Lista de Eventos</h1>
            <h2 className='subtitle-page'>Eventos, atividades e compromissos.</h2>


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
                            <input type="text" id='busca' placeholder="Pesquise pelo nome do evento, responsável ou por outros dados." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                        </div>
                    </div>

                    </div>

                    
                    </div>
                </div>
               
            </div>
            
            

            <div className='btn-add'>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalCadastraEvento"><IoAddSharp /> Novo Evento</button>
            </div>


            {data.length === 0 ? <p className='aviso-sem-dados'>Sem eventos para exibir.</p> : (
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th className='ocultar-0'>Responsável</th>
                        <th>Data e Hora</th>
                        <th className='ocultar-1'>Relação</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((evento) => (
                        <tr key={evento.IdEvento}>
                            <td> <Link data-toggle="modal" data-target="#modalAtualizaEvento" onClick={() => openAtualizacaoModal(evento.IdEvento)} >{evento.Nome}</Link></td>
                            <td className='ocultar-0'>{evento?.Responsavel}</td>
                            <td>{formataDataEHora(evento?.DataHorario)}</td>
                            <td className='ocultar-1'>{evento?.Relacao}</td>
                        </tr>
                    
                    ))}  
                </tbody>
            </table>
            )}

            <Pagination totalItems={data} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />

            <div className="modal fade" id="modalCadastraEvento" tabindex="-1" role="dialog" aria-labelledby="TituloModalLongoExemplo" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EventoNovo openModal={openModal} updateListaEventos={closeAndRefresh} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalAtualizaEvento" tabindex="-1" role="dialog" aria-labelledby="TituloModalLongoExemplo" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EventoEdit  openModal={openAtualizacaoModal} updateListaEventos={closeAndRefresh} IdEventoAtt={IdEventoAtt} modalOpen={modalOpen}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )


}


export default Lista;