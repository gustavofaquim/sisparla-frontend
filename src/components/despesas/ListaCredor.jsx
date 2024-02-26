import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { Link } from "react-router-dom";

import InsereMascara from '../InsereMascara.jsx';

import { IoAddSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";

import ModalButton from '../modal/ModalButton.jsx';
import { Modal, closeAndRefresh } from "../modal/Modal.jsx";   
import NovoCredor from "./CredorNovo.jsx";
import EditCredor from "./EditCredor.jsx";
import Pagination from '../Pagination';

import "../../styles/components/listagem.sass";
import "../../styles/components/filtro.sass";

const ListaCredor = () => {

    const [termoBusca, setTermoBusca] = useState('');
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCredor = data.slice(indexOfFirstItem, indexOfLastItem);

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

        } else if(termoBusca === ''){
            getCredores();
        }
    }, [termoBusca]);

    useEffect(() => {
        getCredores();
    },[]);


    const [modalOpen, setModalOpen] = useState(false);
    const [IdUpdate, setIdUpdate] = useState(null);


    const handleCloseAndRefresh = async () => {
        await closeAndRefresh(setModalOpen, setData, getCredores); // Certifique-se de passar a função getEventos conforme necessário
    };

    return(

        <div className='listagem-demandas'>
            
            <h1 className='title-page'>Lista de Credores</h1>
            <h2 className='subtitle-page'>Pessoas ou empresas prestadoras de serviços, fornecedores de equipamentos etc.</h2> 

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
                <IoAddSharp /> Novo Credor
            </ModalButton>

            {currentCredor.length === 0 ? <p className='aviso-sem-dados'>Sem despesas para exibir.</p> : (
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
                    {currentCredor.map((credor) => (
                            
                        <tr key={credor.IdCredor}>
                            <td><ModalButton key={credor.IdCredor} isLink onClick={() => { setModalOpen(true); setIdUpdate(credor.IdCredor); }}>{credor.Nome}</ModalButton></td>
                            <td><InsereMascara tipo='telefone' valor={credor.Telefone}></InsereMascara> </td>
                            <td>{credor.Tipo} </td>
                            <td> <InsereMascara tipo={credor.Tipo === 'Pessoa Física' ? 'cpf' : 'cnpj'} valor={credor.Documento}></InsereMascara> </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>

            )}

            <Pagination totalItems={data} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {IdUpdate === null ? (
                <NovoCredor closeAndRefresh={handleCloseAndRefresh} />
                ) : (
                <EditCredor
                    closeAndRefresh={handleCloseAndRefresh}
                    IdUpdate={IdUpdate}
                    modalOpen={modalOpen}  
                  />
                )}
            </Modal>
        
        
        </div>
    )
}

export default ListaCredor;