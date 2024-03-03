import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userFetch from "../axios/config.js";
import { Link } from "react-router-dom";

import { FaTrash  } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import ModalButton from '../components/modal/ModalButton.jsx';

import Map from "./map/Map.jsx";

import { Modal, closeAndRefresh } from "../components/modal/Modal.jsx"; 

import DeleteClick from '../components/DeleteClick.jsx';
import ApoiadoresEdit from "../components/ApoiadoresEdit.jsx";

import convertCoordenadas from "./map/convertCoordenadas.jsx";

import "../styles/components/apoiador-ficha.sass";
import "../styles/components/modal.sass"

import { FaAddressCard, FaRegComments, FaMedal } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";


const ApoiadoresFicha = () => {

    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();


    const [data, setData] = useState({});
    const [address, setAddress] = useState();
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const getApoiador = async() => {
        
        
        if(id === undefined){
            console.log("Apoiador não encontrado");
            return;
        }

        await userFetch.get(`/apoiadores/${id}`)
            .then((response) => {
                setData(response.data);
               
                if(data.logradouro){
                    setAddress(data.logradouro + ',' + data.bairro + ',' +  data.cidade + ',' + data.cep + ',BR' ); 
                    console.log(address)
                    handleConvertCoordenadas();
                }
            })
            .catch((error) => {

                if(error.response){
                    console.log(error.response.data.msg);
                }else{
                    console.log("Api não respondeu");
                }
            });
    }

    const handleConvertCoordenadas = async() => {
        try {
            
            const resultadoConversao = await convertCoordenadas(address);
            console.log(resultadoConversao);
            setLatitude(resultadoConversao.latitude);
            setLongitude(resultadoConversao.logitude);
            
            console.log('Latitude: ' + latitude)

        } catch (error) {
            console.log('Não foi possível converter o endereço');
        }
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
                <p className='session-title'><FaUser /> Informações Pessoais</p>
                <hr className='linha-destaque'/>
                <span>Data de Nascimento: {dataNascimento || 'Não informado'} </span>
                <span>E-mail: {data.email || 'Não informado'}</span>
                <span>Profissão: {data.profissao || 'Não informado'}</span>
            </div>

            
            {data.cidade &&            
                 
                <div className="dados-endereco">
                    <p className='session-title'><FaAddressCard /> Endereço</p>
                    <hr className='linha-destaque'/>
                    <span>{data.logradouro} {data.bairro}  {data.complemento}</span>
                    <span>Ponto de Referencia: {data.pontoReferencia}</span>
                    <span>{data.cidade} | CEP: {data.cep}</span>
                </div>
               
            }
            
            
            {data.entidadeNome &&
                
                <div className="dados-entidade">
                    <p className='session-title'><FaRegComments />Movimento Social/Sindical/Entidade</p>
                    <hr className='linha-destaque'/>
                    <span>{data.entidadeNome}</span>
                    <span>Lidderança:{data.entidadeLideranca == 's' ? 'Sim' : 'Não' }</span>
                    <span>Cargo: {data.entidadeCargo}</span>
                </div>
                
            }

            {data.partidoId &&
                
                <div className="dados-partido">
                    <p className='session-title'><FaMedal /> Informações Pardidárias</p>
                    <hr className='linha-destaque'/>
                    <span>Partido: {data.partidoNome}</span>
                    <span>Liderança: {data.partidoLideranca == 's' ? 'Sim' : 'Não' }</span>
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
            
            <Map latitude={latitude} longitude={longitude}></Map>    
            

            <div className="div-btn">
                
                {/* Botão de Adição */}
                <ModalButton key={id} isBtnEdit onClick={() => { setModalOpen(true); setIdUpdate(id);}}>
                    <FaPencil /> Editar Dados
                </ModalButton>
                <Link to={``}><button onClick={ (e) => DeleteClick(e, deleteApoiador) } className="btn btn-excluir"><FaTrash /> Excluir Apoiador</button></Link>
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