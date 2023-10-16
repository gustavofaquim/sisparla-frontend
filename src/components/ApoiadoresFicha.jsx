import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userFetch from "../axios/config.js";

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

    
    //Receber os valores dos inputs
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});
    
    const apoiadorEdit = async(e) =>{
        e.preventDefault();

        try {
            
            const response = await userFetch.put(`/apoiadores/${id}`)

            navigate('/apoiadores');
        } catch (error) {
            
        }
    }

    return(
        <div className="apoiador-ficha">
            <h3>Ficha de Cadastro</h3>

            
            <div className="dados-topo">
                <h2>{data.Nome}</h2>
                <p>{data.Apelido}</p>
            </div>

            <div className="dados-corpo">
                <p>{data.DataNascimento}</p>
                <p>{data.Email}</p>
                <p>{data.Religiao}</p>
                <p>{data.Profissao}</p>
            </div>

            <div className="dados-endereco">
                <p>{data?.EnderecoApoiador?.CidadeApoiador?.Nome}</p>
                <p>{data?.EnderecoApoiador?.Bairro}</p>
                <p>{data?.EnderecoApoiador?.CidadeApoiador?.Lagradouro}</p>
              
            </div>
            
            <div className='form-apoiador'>
                <form >
                    <div class="form-row">

                        <div class="form-group col-md-5">
                            <label htmlFor="nome">Nome</label>
                            <input type="disable" class="form-control" id="nome" name='nome' placeholder="Nome" disabled value={data.Nome} onChange={valueInput} />
                        </div>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default ApoiadoresFicha;