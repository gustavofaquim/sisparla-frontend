import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userFetch from "../axios/config.js";
import { Link } from "react-router-dom";

import "../styles/components/apoiador-ficha.sass";


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
                <span>Religião: {data.religiao || 'Não informado'}</span>
                <span>Profissão: {data.profissao || 'Não informado'}</span>
            </div>

           
            {data.cidade &&
                <>
                    <div className="dados-endereco">
                        <p className='session-title'>Endereço</p>
                        <span>{data.lagradouro} nº {data.numeroEndereco || '0'} - {data.bairro} Qd. {data.quadra}</span>
                        <span>Completo: {data.pontoReferencia}</span>
                        <span>{data.cidade} CEP: {data.CEP}</span>
                    </div>
                </>
            }
            
            
            {data.entidadeNome &&
                <>
                <div className="dados-entidade">
                    <p className='session-title'>Movimento Social/Sindical/Entidade</p>
                    <span>{data.entidadeNome}</span>
                    <span> Liderança: {data.entidadeLideranca}</span>
                    <span>Cargo: {data.entidadeCargo}</span>
                </div>
                </>
            }

            {data.partidoId &&
                <>
                <div className="dados-partido">
                    <p className='session-title'>Informações Pardidárias</p>
                    <span>{data.partidoNome}</span>
                    <span> Liderança: {data.partidoLideranca}</span>
                    <span>Cargo: {data.partidoCargo}</span>
                </div>
                </>
            }

            {data.demandas &&
                <>
                <div className="dados-demandas">
                    <p className='session-title'>Demandas</p>
                    {data?.demandas?.map((demanda, index) => (
                        <div key={index}>
                        <Link to={`/demandas/${demanda.demandaId}`}><span>Assunto: {demanda.assunto}</span></Link>
                        </div>
                    ))}
                </div>
                </>
            }

            <div className="div-btn">
                <Link to={`/apoiador-edit/${data.idApoiador}`}><button className="btn btn-editar" >Editar Dados</button></Link>
                <Link to={``}><button className="btn btn-add-evento" >Adicionar em Evento</button></Link>
                <Link to={``}><button className="btn btn-add-demanda" >Nova Demanda</button></Link>
            </div>
        </div>

        
    );
}

export default ApoiadoresFicha;