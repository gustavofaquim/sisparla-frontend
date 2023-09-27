import * as React from 'react';

import userFetch from "../axios/config.js";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/components/apoiador-novo.sass"

const ApoiadoresNovo = () => {


    const navigate = useNavigate();

    const [nome, setNome] = useState();
    const [apelido, setApelido] = useState();
    const [profissao, setProfissao] = useState();
    const [religiao, setReligiao] = useState();
    const [nascimento, setNascimento] = useState();
    const [classificacao, setClassificacao] = useState();
    const [email, setEmail] = useState();
    const [telefone, setTelefone] = useState();
    const [situacao, setSituacao] = useState();
    const [cep, setCep] = useState();
    const [cidade, setCidade] = useState();
    const [estado, setEstado] = useState();
    const [endereco, setEndereco] = useState();
    const [bairro, setBairro] = useState();
    const [complemento, setComplementoe] = useState();
    const [entidade, setEntidade] = useState();
    const [entidadeTipo, setEntidadeTipo] = useState();
    const [entidadeNome, setEntidadeNome] = useState();
    const [entidadeSigla, setEntidadeSigla] = useState();
    const [entidadeCargo, setEntidadeCargo] = useState();
    const [lideranca, setLideranca] = useState();
    const [partido, setPartido] = useState();
    const [partidoCargo, setPartidoCargo] = useState();
    const [partidoLideranca, setPartidoLideranca] = useState();


    const [responseMessage, setResponseMessage] = useState();


    const createApoiador = async(e) => {
        e.preventDefault();

        try {
            
            const post = {nome, apelido, profissao, religiao, nascimento, classificacao,email, telefone, situacao, cep, cidade,
            estado, endereco, bairro, complemento, entidade, entidadeTipo, entidadeCargo, entidadeNome, entidadeSigla,lideranca,
            partido, partidoCargo, partidoLideranca };
                
            const response = await userFetch.post("/apoiadores", post);

            const msg = response.data.msg || "Usuário cadastrado com sucesso :) "; 

            setResponseMessage(msg);

            console.log(msg);
            
            navigate('/');


        } catch (error) {
            console.log(`Erro ao cadastrar o apoiador: ${error}`);
            setResponseMessage(error);
        }

    }
    
    return(

        <div className="cadastrar-apoiador">
           <h1 className='title-page'>Novo Apoiador</h1>
           <h2 className='subtitle-page'>Cadastre um novo apoiador.</h2>

            <div className='form-apoiador'>
                <form>

                <p className='form-session-title'>Informações Pessoais</p>
                <div class="form-row">

                    <div class="form-group col-md-4">
                        <label htmlFor="nome">Nome</label>
                        <input type="nome" class="form-control" id="nome" placeholder="Nome" />
                    </div>

                    <div class="form-group col-md-2">
                        <label htmlFor="apelido">Apelido</label>
                        <input type="text" class="form-control" id="apelido" placeholder="Apelido" />
                    </div>

                    <div class="form-group col-md-2">
                        <label htmlFor="inputEstado">Profissão</label>
                        <select id="inputEstado" class="form-control">
                            <option selected>Escolher...</option>
                            <option>...</option>
                        </select>
                    </div>

                    <div class="form-group col-md-2">
                        <label htmlFor="nascimento">Data de Nascimento</label>
                        <input type="date" class="form-control" id="nascimento"  />
                    </div>


                    <div class="form-group col-md-2">
                        <label htmlFor="classificacao">Classificação</label>
                        <select id="classificacao" class="form-control">
                            <option selected>Escolher...</option>
                            <option>...</option>
                        </select>
                    </div>


                </div>


                <div class="form-row">

                    <div class="form-group col-md-4">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" class="form-control" id="email" placeholder="E-mail" />
                    </div>

                    <div class="form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <input type="text" class="form-control" id="telefone" placeholder="Telefone" />
                    </div>

                    <div class="form-group col-md-2">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" class="form-control">
                            <option selected>Escolher...</option>
                            <option>...</option>
                        </select>
                    </div>
               
                </div>

                <div class="form-row">

                    <div class="form-group col-md-1">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" class="form-control" id="cep" name="cep" />
                    </div>

                    <div class="form-group col-md-2">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" class="form-control" id="cidade" placeholder='Cidade' />
                    </div>
                    
                    <div class="form-group col-md-1">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" class="form-control" name='estado'>
                            <option selected>Escolher...</option>
                            <option>...</option>
                        </select>
                    </div>

                    <div class="form-group col-md-4">
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" class="form-control" id="endereco" />
                    </div>
                    
                    <div class="form-group col-md-2">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" class="form-control" id="bairro" />
                    </div>


                    <div class="form-group col-md-2">
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" class="form-control" id="complemento" />
                    </div>

                </div>

                <p className='form-session-title'>Movimento Social/Sindical/Entidade</p>

                <div class="form-row">

                   <div class="form-group col-md-2">
                    <p>Movimento ou Entidade ?</p>
                    <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="entidade" id="entidade" value="sim" />
                            <label class="form-check-label" for="entidade">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="entidade" id="entidade2" value="nao" />
                            <label class="form-check-label" for="entidade2">Não</label>
                        </div>
                   </div>


                    <div class="form-group col-md-1">
                        <label htmlFor="entidadeTipo">Tipo</label>
                        <select id="entidadeTipo" class="form-control">
                            <option selected>Escolher...</option>
                            <option>...</option>
                        </select>
                    </div>

                    <div class="form-group col-md-3">
                        <label htmlFor="entidadeNome">Nome</label>
                        <input type="text" class="form-control" id="entidadeNome" placeholder='Nome do Movimento Social ou Sindicato' />
                    </div>

                    <div class="form-group col-md-1">
                        <label htmlFor="entidadeSigla">Sigla</label>
                        <input type="text" class="form-control" id="entidadeSigla" />
                    </div>

                    <div class="form-group col-md-3">
                        <label htmlFor="entidadeCargo">Cargo</label>
                        <input type="text" class="form-control" id="entidadeCargo" />
                    </div>

                    <div class="form-group col-md-2">
                        <p>Liderança ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="lideranca" id="lideranca1" value="sim" />
                            <label class="form-check-label" for="lideranca1">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="lideranca" id="lideranca2" value="nao" />
                            <label class="form-check-label" for="lideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <p className='form-session-title'>Partido Político</p>
                <div class="form-row">
                    
                    <div class="form-group col-md-3">
                        <label htmlFor="partido">Agremiação partidária</label>
                        <select id="partido" class="form-control">
                            <option selected>Escolher...</option>
                            <option>...</option>
                        </select>
                    </div>

                    <div class="form-group col-md-3">
                        <label htmlFor="partidoCargo">Cargo</label>
                        <input type="text" class="form-control" id="partidoCargo" />
                    </div>

                    <div class="form-group col-md-2">
                        <p>Liderança ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca1" value="sim" />
                            <label class="form-check-label" for="partidoLideranca1">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca2" value="nao" />
                            <label class="form-check-label" for="partidoLideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="infoAdicional">Anotações Internas</label>
                        <textarea class="form-control" id="infoAdicional" name='infoAdicional'></textarea>
                    </div> 
                </div>

                <div className='btn'>
                    <button type="submit" class="btn btn-primary btn-cadastrar" >Cadastrar Apoiador</button>
                </div>
                

                </form>
            </div>
        </div>
    )
}

export default ApoiadoresNovo;