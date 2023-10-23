import * as React from 'react';

import userFetch from "../axios/config.js";
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import "../styles/components/apoiador-novo.sass"

import { FaWhatsapp } from "react-icons/fa6";

const ApoiadoresEdit = () => {


    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    
    const [profissoes, setProfissoes] = useState([]);
    const [classificacoes, setClassificacoes] = useState([]);
    const [religioes, setReligioes] = useState([]);
    const [situacoes, setSituacoes] = useState([]);
    const [estados, setEstados] = useState([]);
    const [partidos, setPartidos] = useState([]);
    const [tiposEntidade, setTiposEntidade] = useState([]);
    const [partido, setPartido] = useState();
    const [suggestions, setSuggestions] = useState([]);
    


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
    };
    
    const getSituacoes = async() => {
        try {
            
            const response = await userFetch.get("/situacoesCadastros");            
            const data = response.data;
            setSituacoes(data);
           

        } catch (error) {
            console.log(`Erro ao recuperar as informações de situacoes cadastrais: ${error}`);
        }
    };

    const getClassificacoes = async() => {
        try {
            
            const response = await userFetch.get("/classificacoes");
            const data = response.data;
            setClassificacoes(data);
          

        } catch (error) {
            console.log(`Erro ao recuperar as informações de classificações: ${error}`);
        }
    };

    const getTipoEntidade = async() => {
        try {
            
            const response = await userFetch.get("/tiposEntidade");
            const data = response.data;
            setTiposEntidade(data);

        } catch (error) {
            console.log(`Erro ao recuperar os tipos de entidades: ${error}`);
        }
    };

    const getEstados = async() => {
        try {
            const response = await userFetch.get("/estados");
            const data = response.data;
            setEstados(data);
        } catch (error) {
            console.log(`Erro ao recuperar a lista de estados: ${error}`);
        }
    };

    const getPartidos = async() => {
        try {
            const tipo = 'partido'

            const response = await userFetch.get(`/entidades/${tipo}`);
            const data = response.data;
            
            setPartidos(data);

        } catch (error) {
            console.log(`Erro ao recuperar a lista de partidos: ${error}`);
        }
    };

    const getProfissoes = async() => {

        try {
            const response = await userFetch.get("/profissoes");

            const data = response.data;
            
            setProfissoes(data);
            
        } catch (error) {
            console.log(`Erro ao recuperar a profissão: ${error}`);
        }
    };

    const getReligioes = async() => {

        try {
            const response = await userFetch.get('/religioes');
            const data = response.data;
            setReligioes(data);
           
        } catch (error) {
            console.log(`Erro ao recuperar a lista de religioes: ${error}`);
        }
    }


    useEffect(() => {
        getApoiador();
        getSituacoes();
        getClassificacoes();
        getTipoEntidade();
        getPartidos();
        getProfissoes();
        getEstados();
        getReligioes();
    }, []);


    //Receber os valores dos inputs
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});


    const apoiadorEdit = async (e) => {
        e.preventDefault();
        console.log('Dados do form');
        console.log(data);

       try {
            
           const response = await userFetch.put(`/apoiadores/${id}`, data);

            navigate('/apoiadores');

        } catch (error) {
            console.log('Deu erro:' + error);
        } 
    }

    

    
    return(

        <div className="cadastrar-apoiador">
           <h1 className='title-page'>Novo Apoiador</h1>
           <h2 className='subtitle-page'>Cadastre um novo apoiador.</h2>

            <div className='form-apoiador'>
                <form onSubmit={(e) => apoiadorEdit(e)}>

                <p className='form-session-title'>Informações Pessoais</p>
                <div class="form-row">

                    <div class="form-group col-md-5">
                        <label htmlFor="nome">Nome</label>
                        <input type="nome" class="form-control" id="nome" name='nome' placeholder="Nome" value={data.nome}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="apelido">Apelido</label>
                        <input type="text" class="form-control" id="apelido" placeholder="pelido" name="apelido" value={data.apelido}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="profissao">Profissão</label>
                        <select id="profissao" name='profissao' class="form-control"  onChange={valueInput}>
                            <option >Escolher...</option>
                            {
                                profissoes.map((profissao) => (
                                    
                                    <option key={profissao.IdProfissao} selected={profissao.Nome === data.profissao}  value={profissao.profissao}>{profissao.Nome}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div class="form-group">
                        <label htmlFor="religiao">Religião</label>
                        <select id="religiao" name='religiao' class="form-control"  onChange={valueInput}>
                            <option >Escolher...</option>
                            {
                                religioes.map((religiao) => (
\
                                    <option key={religiao.IdReligiao} selected={religiao.Nome === data.religiao}  value={religiao.Nome}>{religiao.Nome}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div class="form-group">
                        <label htmlFor="nascimento">Data de Nascimento</label>
                        <input type="date" class="form-control" id="dataNascimento" name='dataNascimento' value={data.dataNascimento}  onChange={valueInput}  />
                    </div>


                    <div class="form-group">
                        <label htmlFor="classificacao">Classificação</label>
                        <select id="classificacao" class="form-control"  name='idClassificacao'  onChange={valueInput}>
                            <option selected>Escolher...</option>
                            
                            {
                                classificacoes.map((classificacao) => (
                                    <option key={classificacao.idClassificacao} selected={classificacao.idClassificacao === data.idClassificacao} value={classificacao.idClassificacao}>{classificacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>


                    <div class="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" class="form-control" name="idSituacao" onChange={valueInput} >
                            <option selected>Escolher...</option>
                            {
                                situacoes.map((situacao) => (
                                    <option key={situacao.idSituacao} selected={situacao.idSituacao === data.idSituacao} value={situacao.idSituacao}>{situacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>


                <div class="form-row">

                    <div class="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="E-mail" value={data.email}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="telefone">Telefone 
                        <span> <input type="checkbox" id='whatsapp' checked={data.telefoneWhatsApp} name='Whatsapp' /> <FaWhatsapp /> </span>
                        </label>
                        <input type="text" class="form-control" name="TelefoneApoiador.Numero" id="numeroTelefone" placeholder="Telefone" value={data.numeroTelefone}  onChange={valueInput}/>
                    </div>
               
                </div>

                <p className='form-session-title'>Endereço</p>
                <div class="form-row">

                    <input type="hidden" value={data.idEndereco} onChange={valueInput}  />
                    <div class="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" class="form-control" id="cep" name="cep" value={data.cep}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" class="form-control" name="cidade" id="cidade" placeholder='Cidade' value={data.cidade}   onChange={valueInput} />
                    </div>
                    
                    <div class="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" class="form-control" name='idEstado'  onChange={valueInput} >
                            <option selected>Escolher...</option>
                            {
                                estados.map((estado) => (
                                    <option key={estado.IdEstado} selected={estado.IdEstado === data.estado}  value={estado.IdEstado}>{estado.UF}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div class="form-group">
                        <label htmlFor="endereco">Lagradouro</label>
                        <input type="text" class="form-control" name="lagradouro" id="endereco" value={data.lagradouro} onChange={valueInput}  />
                    </div>
                    
                    <div class="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" class="form-control" id="bairro" name="bairro" value={data.bairro} onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="bairro">Quadra</label>
                        <input type="text" class="form-control" id="bairro" name="quadra" value={data.quadra} onChange={valueInput}  />
                    </div>

                    <div class="form-group">
                        <label htmlFor="numero">Numero</label>
                        <input type="text" class="form-control" id="numero" name="numeroEndereco" value={data.numeroEndereco} onChange={valueInput}  />
                    </div>


                    <div class="form-group">
                        <label htmlFor="complemento">Ponto Referencia</label>
                        <input type="text" class="form-control" id="complemento" name="pontoReferencia" value={data.pontoReferencia} onChange={valueInput} />
                    </div>

                </div>

                <p className='form-session-title'>Movimento Social/Sindical/Entidade</p>

                <div class="form-row">


                    <div class="form-group">
                        <label htmlFor="entidadeTipo">Tipo</label>
                       
                        <select id="entidadeTipo" class="form-control" name="entidadeTipo" value={data.entidadeTipo} onChange={valueInput}>
                            <option selected>Escolher...</option>
                           {
                                tiposEntidade.map((tipos) => (
                                    <option key={tipos.IdTipo} selected={tipos.Tipo === data.entidadeTipo} value={tipos.Tipo}>{tipos.Tipo}</option>
                                ))
                           }
                        </select>
                    </div>

                    <div class="form-group">
                        <label htmlFor="entidadeNome">Nome</label>
                        <input type="text" class="form-control" id="entidadeNome" placeholder='Nome do Movimento Social ou Sindicato' name="entidadeNome" value={data.entidadeNome}  onChange={valueInput} />
                        {suggestions.length > 0 && (
                            <ul>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                                </li>
                            ))}
                            </ul>
                        )}
                        </div>

                    <div class="form-group">
                        <label htmlFor="entidadeSigla">Sigla</label>
                        <input type="text" class="form-control" id="entidadeSigla" name="entidadeSigla"  value={data.enntidadeSigla} onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="entidadeCargo">Cargo</label>
                        <input type="text" class="form-control" id="entidadeCargo" name="entidadeCargo" value={data.entidadeCargo} onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <p>Liderança ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="entidadeLideranca" id="lideranca1" value="sim" checked={data.entidadeLideranca == "s"} onChange={valueInput} />
                            <label class="form-check-label" for="lideranca1">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="entidadeLideranca" id="lideranca2" value="nao" checked={data.entidadeLideranca == "n"}  onChange={valueInput} />
                            <label class="form-check-label" for="lideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <p className='form-session-title'>Partido Político</p>
                <div class="form-row">
                    
                <div className="form-group">
                    <label htmlFor="partido">Agremiação partidária</label>
                    <select id="partido" className="form-control" name="partidoId" onChange={valueInput}>
                        <option >Escolher...</option>
                        {partidos.map((partidoItem) => (
                            <option key={partidoItem.IdEntidade} selected={partidoItem.IdEntidade === data.partidoId}  value={partidoItem.IdEntidade}>
                                {partidoItem.Sigla} - {partidoItem.Nome}
                            </option>
                        ))}
                    </select>
                </div>

                    <div class="form-group">
                        <label htmlFor="partidoCargo">Cargo</label>
                        <input type="text" class="form-control" id="partidoCargo" name="partidoCargo" value={data.partidoCargo} onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <p>Liderança ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca1" value="s" checked={data.partidoLideranca == "s"} onChange={valueInput} />
                            <label class="form-check-label" for="partidoLideranca1">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca2" value="n" checked={data.partidoLideranca== "n"} onChange={valueInput} />
                            <label class="form-check-label" for="partidoLideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="infoAdicional">Anotações Internas</label>
                        <textarea class="form-control" id="infoAdicional" name='informacaoAdicional'  value={data.informacaoAdicional} onChange={valueInput} ></textarea>
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

export default ApoiadoresEdit;