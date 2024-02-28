import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userFetch from "../axios/config.js";
import { Link } from "react-router-dom";


import ModalButton from '../components/modal/ModalButton.jsx';
import { Modal, closeAndRefresh } from "../components/modal/Modal.jsx"; 

import DeleteClick from '../components/DeleteClick.jsx';
import ApoiadoresEdit from "../components/ApoiadoresEdit.jsx";

import "../styles/components/apoiador-ficha.sass";
import "../styles/components/modal.sass"


const ApoiadoresFicha = () => {

    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();


    const [data, setData] = useState({});
    

    const getApoiador = async() => {
        
        
        if(id === undefined){
            console.log("Apoiador não encontrado");
            return;
        }

        await userFetch.get(`/apoiadores/${id}`)
            .then((response) => {
                setData(response.data); 
            })
            .catch((error) => {

                if(error.response){
                    console.log(error.response.data.msg);
                }else{
                    console.log("Api não respondeu");
                }
            });
    }


    useEffect(() => {
        getApoiador();
    }, []);


    function formataData(dataString) {
        
        const data = new Date(`${dataString}T00:00:00-03:00`);
       
        // Verificando se a conversão foi bem-sucedida
        if (isNaN(data.getTime())) {
            return 'Data inválida';
        }

    
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
      
        return `${dia}/${mes}/${ano}`;
    }


    const deleteApoiador = async() => {
        
        try {
            
            const response = await userFetch.delete(`/apoiador/${id}`);
            
            if(response.status === 200){
                navigate('/apoiadores');
            }

        } catch (error) {
            toast.error('Erro ao excluir o apoiador.');
            console.log(`Error: ` + error)
        }
    }

    const dataNascimento = formataData(data.dataNascimento);

    const [modalOpen, setModalOpen] = useState(false);
    const [IdUpdate, setIdUpdate] = useState(null);

    const handleCloseAndRefresh = async () => {
        await closeAndRefresh(setModalOpen, setData, getApoiador); // Certifique-se de passar a função getEventos conforme necessário
    };



    return(
        <div className="apoiador-ficha">

            <div className="dados-topo">
                <h2>{data.nome}</h2>
                <span>{data.apelido}</span>
                <span>Celular: {data.numeroTelefone}</span>
            </div>


            <div className="dados-corpo">
                <p className='session-title'>Informações Pessoais</p>
                <hr className='linha-destaque'/>
                <span>Data de Nascimento: {dataNascimento || 'Não informado'} </span>
                <span>E-mail: {data.email || 'Não informado'}</span>
                <span>Profissão: {data.profissao || 'Não informado'}</span>
            </div>

           
            {data.cidade &&
                
                <div className="dados-endereco">
                    <p className='session-title'>Endereço</p>
                    <hr className='linha-destaque'/>
                    <span>{data.logradouro} {data.bairro}  {data.complemento}</span>
                    <span>Ponto de Referencia: {data.pontoReferencia}</span>
                    <span>{data.cidade} | CEP: {data.cep}</span>
                </div>
               
            }
            
            
            {data.entidadeNome &&
                
                <div className="dados-entidade">
                    <p className='session-title'>Movimento Social/Sindical/Entidade</p>
                    <hr className='linha-destaque'/>
                    <span>{data.entidadeNome}</span>
                    <span> Liderança: {data.entidadeLideranca}</span>
                    <span>Cargo: {data.entidadeCargo}</span>
                </div>
                
            }

            {data.partidoId &&
                
                <div className="dados-partido">
                    <p className='session-title'>Informações Pardidárias</p>
                    <hr className='linha-destaque'/>
                    <span>Partido: {data.partidoNome}</span>
                    <span>Liderança: {data.partidoLideranca || Não}</span>
                    <span>Cargo: {data.partidoCargo}</span>
                </div>
                
            }

            {data?.demanda?.demandaId &&
                <div className="dados-demandas">
                    <p className='session-title'>Demandas</p>
                    <hr className='linha-destaque'/>
                    {data?.demandas?.map((demanda, index) => (
                        <div key={index}>
                        <Link to={`/demandas/${demanda.demandaId}`}><span>{demanda.assunto}</span></Link>
                        </div>
                    ))}
                </div>
            }

            <div className="div-btn">
                
                {/* Botão de Adição */}
                <ModalButton key={id} isBtnEdit onClick={() => { setModalOpen(true); setIdUpdate(id);}}>
                    Editar Dados
                </ModalButton>
                <Link to={``}><button onClick={ (e) => DeleteClick(e, deleteApoiador) } className="btn btn-excluir">Excluir Apoiador</button></Link>
                  {/* <Link to={``}><button className="btn btn-add-evento" >Adicionar em Evento</button></Link>
                <Link to={``}><button className="btn btn-add-demanda" >Nova Demanda</button></Link>*/}
            </div>


            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={handleCloseAndRefresh}>
                <ApoiadoresEdit
                    closeAndRefresh={handleCloseAndRefresh}
                    IdUpdate={id}
                    modalOpen={modalOpen}  
                    />
            </Modal>
            
           
        </div>
 
    );
}

export default ApoiadoresFicha;