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
            <h3>Ficha de Cadastro</h3>

            
            <div className="dados-topo">
                <h2>{data.nome}</h2>
                <span>{data.apelido}</span>
                <span>Celular: {data.numeroTelefone}</span>
            </div>

            <div className="dados-corpo">
                <span>Data de Nascimento: {dataNascimento}</span>
                <span>{data.email}</span>
                <span>{data.religiao}</span>
                <span>{data.profissao}</span>
            </div>

            <div className="dados-endereco">
                <span>{data.cidade}</span>
                <span>{data.cep}</span>
                <span>{data.bairro}</span>
                <span>{data.lagradouro}</span>
                <span>{data.numeroEndereco}</span>
                <span>{data.quadra}</span>
                <span>{data.pontoReferencia}</span>
            </div>
            
            <Link to={`/apoiador-edit/${data.idApoiador}`}><button className="btn" >Editar Dados</button></Link>
        </div>

        
    );
}

export default ApoiadoresFicha;