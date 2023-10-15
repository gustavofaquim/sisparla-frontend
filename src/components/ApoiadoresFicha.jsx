import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userFetch from "../axios/config.js";



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
    

    return(
        <div className="apoiador-ficha">
            <h3>Ficha de Cadastro</h3>
        </div>
    );
}

export default ApoiadoresFicha;