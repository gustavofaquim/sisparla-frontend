import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaChevronDown, FaTrashCan } from "react-icons/fa6";
import { IoAddSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";


import ModalButton from '../modal/ModalButton.jsx';
import { Modal, closeAndRefresh } from "../modal/Modal.jsx"; 
import NovaDespesa from "./Nova.jsx";
import EditDespesa from "./Edit.jsx";

import Pagination from '../Pagination';

import "../../styles/components/listagem.sass";
import "../../styles/components/filtro.sass";
import DespesasEdit from './Edit.jsx';

const DespesasList = () => {
    
    const [termoBusca, setTermoBusca] = useState('');
    const [data, setData] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDespesa = data.slice(indexOfFirstItem, indexOfLastItem);

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

    const [modalOpen, setModalOpen] = useState(false);
    const [IdUpdate, setIdUpdate] = useState(null);

    const handleCloseAndRefresh = async () => {
        await closeAndRefresh(setModalOpen, setData, getDespesas); // Certifique-se de passar a função getEventos conforme necessário
    };

    return(
        <div className='listagem-demandas'>

        <h1 className='title-page'>Lista de Despesas</h1>
        <h2 className='subtitle-page'>Lista de todas as despesas.</h2>


        <div id="accordion">
            <div className="card">
                <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <IoFilter /> Filtrar Informações
                    </button>
                </h5>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                    <div className='seletor-filtros'>
                        <div className='filtro'>
                            <p>Digite um termo para buscar</p>
                            <input type="text" id='busca' placeholder="" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                        </div>
                    </div>
                </div>

                
                </div>
            </div> 
        </div>


        
            {/* Botão de Adição */}
            <ModalButton onClick={() => { setModalOpen(true); setIdUpdate(null); }}>
                <IoAddSharp /> Nova Despesa
            </ModalButton>
       

        {currentDespesa.length === 0 ? <p className='aviso-sem-dados'>Sem despesas para exibir.</p> : (
        <table>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Credor</th>
                    <th>Valor</th>
                   
                </tr>
            </thead>

            <tbody>
                    
                    {currentDespesa.map((despesa) => (
                        
                        <tr key={despesa.IdDespesa}>
                            <td> <ModalButton key={despesa.IdDespesa} isLink onClick={() => { setModalOpen(true); setIdUpdate(despesa.IdDespesa); }}> {despesa.Descricao} </ModalButton> </td>
                            <td>{despesa?.CredorDespesa?.Nome} </td>
                            <td> R$ {despesa?.Valor} </td>
                        </tr>
                    
                    ))}       
            </tbody>
        </table>
        )}

        <Pagination totalItems={data} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />

                        
        {/* Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            {IdUpdate === null ? (
            <NovaDespesa closeAndRefresh={handleCloseAndRefresh} />
            ) : (
            <DespesasEdit
                closeAndRefresh={handleCloseAndRefresh}
                IdUpdate={IdUpdate}
                modalOpen={modalOpen}  
                />
            )}
        </Modal>
    </div>

    );
};

export default DespesasList;