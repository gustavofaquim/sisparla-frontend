import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';


import { Modal, closeAndRefresh } from "../modal/Modal.jsx"; 
import ModalButton from '../modal/ModalButton.jsx';
import GrupoNovo from './Novo.jsx';

import { IoAddSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";

import Pagination from '../Pagination';
import "../../styles/components/listagem.sass";
import "../../styles/components/tabela.sass";
import "../../styles/components/modal.sass";
import GrupoEditar from './Editar.jsx';



const Grupolist = () => {

    const [data, setData] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [IdUpdate, setIdUpdate] = useState(null);

    const handleCloseAndRefresh = async () => {
        await closeAndRefresh(setModalOpen, setData, getGrupos); // Certifique-se de passar a função getEventos conforme necessário
    };
   

    const getGrupos = async() => {
        try {
            
            const response = await userFetch.get('/grupos');

            if(response.status === 200) {
                setData(response.data);
            }

        } catch (error) {
            console.log(`Erro ao listar grupos: ${error}`);
        }
    }

    useEffect(() => {
        getGrupos();
    },[]);

    return(
        <div className='listagem-demandas'>
            <h1 className='title-page'>Lista de Grupos</h1>
            <h2 className='subtitle-page'>Grupos de Apoiadores com caracteristicas em comum.</h2>



            {/* Botão de Adição */}
            <ModalButton onClick={() => { setModalOpen(true); setIdUpdate(null); }}>
                <IoAddSharp /> Novo Grupo
            </ModalButton>


            {data.length === 0 ? <p className='aviso-sem-dados'>Sem grupos para exibir.</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Responsável</th>
                           
                        </tr>
                    </thead>

                    <tbody>
                            
                            {data.map((grupo) => (
                                
                                <tr key={grupo.IdGrupo}>
                                    <td> <ModalButton key={grupo.IdGrupo} isLink onClick={() => { setModalOpen(true); setIdUpdate(grupo.IdGrupo); }}> {grupo.Nome} </ModalButton> </td>
                                    <td>{grupo?.ResponsavelGrupo?.Nome}</td>
                                </tr>
                            
                            ))}       
                    </tbody>
                </table> 
            )}

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={handleCloseAndRefresh}>
                {IdUpdate === null ? (
                    <GrupoNovo closeAndRefresh={handleCloseAndRefresh} />
                ): (
                    <GrupoEditar 
                        closeAndRefresh={handleCloseAndRefresh}
                        IdUpdate={IdUpdate}
                        modalOpen={modalOpen} 
                    />
                )}
                
            </Modal>             

        </div>
    );
}

export default Grupolist;