import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userFetch from "../axios/config.js";
import { Link } from "react-router-dom";

import "../styles/components/apoiador-ficha.sass";


const ApoiadoresFicha = () => {

    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();


    const [data, setData] = useState({
        title: '',
        description: '',
        image: '',
        profissao: '',
        cpf: '',
        religiao: '',
        nascimento: '',
        classificacao: '',
        email: '',
        telefone: '',
        situacao: '',
        cep: '',
        cidade: '',
        estado: '',
        lagradouro: '',
        quadra: '',
        numero: '',
        bairro: '',
        pontoReferencia: '',
        partido: '',
        entidade: '',
        informacoesAdicionais: ''
    });

    const getApoiador = async() => {
        
        if(id === undefined){
            console.log("Apoiador não encontrado");
            return;
        }

        await userFetch.get(`/apoiadores/${id}`)
            .then((response) => {
                setData(response.data); 
                console.log(response.data);   
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


    const dataNascimento = formataData(data.DataNascimento);

    return(
        <div className="apoiador-ficha">
            <h3>Ficha de Cadastro</h3>

            
            <div className="dados-topo">
                <h2>{data.Nome}</h2>
                <span>{data.Apelido}</span>
                <span>Celular: {data?.TelefoneApoiador?.Numero}</span>
            </div>

            <div className="dados-corpo">
                <span>Data de Nascimento: {dataNascimento}</span>
                <span>{data.Email}</span>
                <span>{data.Religiao}</span>
                <span>{data.Profissao}</span>
            </div>

            <div className="dados-endereco">
                <span>{data?.EnderecoApoiador?.CidadeApoiador?.Nome}</span>
                <span>{data?.EnderecoApoiador?.CidadeApoiador?.Nome}</span>
                <span>{data?.EnderecoApoiador?.CEP}</span>
                <span>{data?.EnderecoApoiador?.Bairro}</span>
                <span>{data?.EnderecoApoiador?.Lagradouro}</span>
                <span>{data?.EnderecoApoiador?.Numero}</span>
                <span>{data?.EnderecoApoiador?.Quadra}</span>
                <span>{data?.EnderecoApoiador?.PontoReferencia}</span>
            </div>
            
            <Link to={`/apoiador-edit/${data.IdApoiador}`}><button className="btn" >Editar Dados</button></Link>
        </div>

        
    );
}

export default ApoiadoresFicha;