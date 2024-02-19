import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userFetch from "../axios/config.js";
import { Link } from "react-router-dom";


import DeleteClick from '../components/DeleteClick.jsx';
import ApoiadoresEdit from "../components/ApoiadoresEdit.jsx";

import "../styles/components/apoiador-ficha.sass";
import "../styles/components/modal.sass"


const ApoiadoresFicha = () => {

    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();


    const [data, setData] = useState({});

    const [modalOpen, setModalOpen] = useState(false);

    
    const openModal = () => {
        setModalOpen(true);

        $('#modalCadastroApoiador').modal('hide');
    };

    const closeAndRefresh =  async () => {
        setModalOpen(false);
        
        try {
            // Chamar a função de obtenção dos dados atualizados
            const novosDados = await getApoiador();
    
            if (novosDados) {
                // Atualizar o estado com os novos dados do apoiador
                setData(novosDados);
            }
        } catch (error) {
            console.error('Erro ao obter os dados atualizados do apoiador:', error);
            // Lógica de tratamento de erro, se necessário
        }


        // Atualizar o estado com os novos dados do apoiador recebidos da API
        setData(novosDados);
    };
      


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

    return(
        <div className="apoiador-ficha">

            <div className="dados-topo">
                <h2>{data.nome}</h2>
                <span>{data.apelido}</span>
                <span>Celular: {data.numeroTelefone}</span>
            </div>


            <div className="dados-corpo">
                <p className='session-title'>Informações Pessoais</p>
                <span>Data de Nascimento: {dataNascimento || 'Não informado'} </span>
                <span>E-mail: {data.email || 'Não informado'}</span>
                <span>Profissão: {data.profissao || 'Não informado'}</span>
            </div>

           
            {data.cidade &&
                
                <div className="dados-endereco">
                    <p className='session-title'>Endereço</p>
                    <span>{data.logradouro} {data.bairro}  {data.complemento}</span>
                    <span>Ponto de Referencia: {data.pontoReferencia}</span>
                    <span>{data.cidade} | CEP: {data.cep}</span>
                </div>
               
            }
            
            
            {data.entidadeNome &&
                
                <div className="dados-entidade">
                    <p className='session-title'>Movimento Social/Sindical/Entidade</p>
                    <span>{data.entidadeNome}</span>
                    <span> Liderança: {data.entidadeLideranca}</span>
                    <span>Cargo: {data.entidadeCargo}</span>
                </div>
                
            }

            {data.partidoId &&
                
                <div className="dados-partido">
                    <p className='session-title'>Informações Pardidárias</p>
                    <span>{data.partidoNome}</span>
                    <span> Liderança: {data.partidoLideranca}</span>
                    <span>Cargo: {data.partidoCargo}</span>
                </div>
                
            }

            {data.demandas &&
                <div className="dados-demandas">
                    <p className='session-title'>Demandas</p>
                    {data?.demandas?.map((demanda, index) => (
                        <div key={index}>
                        <Link to={`/demandas/${demanda.demandaId}`}><span>{demanda.assunto}</span></Link>
                        </div>
                    ))}
                </div>
            }

            <div className="div-btn">
                <button type="button" className="btn btn-editar" data-toggle="modal" data-target="#modalCadastroApoiador">Editar Dados</button>
                <Link to={``}><button onClick={ (e) => DeleteClick(e, deleteApoiador) } className="btn btn-excluir">Excluir Apoiador</button></Link>
                <Link to={``}><button className="btn btn-add-evento" >Adicionar em Evento</button></Link>
                <Link to={``}><button className="btn btn-add-demanda" >Nova Demanda</button></Link>
            </div>


            
            <div className="modal fade" id="modalCadastroApoiador" tabindex="-1" role="dialog" aria-labelledby="TituloModalLongoExemplo" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ApoiadoresEdit openModal={openModal} updateApoiadorFicha={closeAndRefresh}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        
    );
}

export default ApoiadoresFicha;