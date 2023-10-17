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
    const [situacoes, setSituacoes] = useState([]);
    const [estados, setEstados] = useState([]);
    const [partidos, setPartidos] = useState([]);
    const [tiposEntidade, setTiposEntidade] = useState([]);
    const [partido, setPartido] = useState();
    const [suggestions, setSuggestions] = useState([]);
    


    const [data, setData] = useState({
        Nome: '',
        Apelido: '',
        Profissao: '',
        CPF: '',
        Religiao: '',
        DataNascimento: '',
        Classificacao: '',
        Email: '',
        Telefone: '',
        Situacao: '',
        CEP: '',
        Cidade: '',
        Estado: '',
        Lagradouro: '',
        Quadra: '',
        Numero: '',
        Bairro: '',
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


    useEffect(() => {
        getApoiador();
        getSituacoes();
        getClassificacoes();
        getTipoEntidade();
        getPartidos();
    }, []);


    //Receber os valores dos inputs
    
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});

    const apoiadorEdit = async (e) => {
        e.preventDefault();
        console.log('Dados do form');
        console.log(data);

       /* try {
            
            const response = await userFetch.put(`/apoiadores/${id}`,data);

            navigate('/apoiadores');

        } catch (error) {
            console.log('Deu erro:' + error);
        } */
    }

    
    const vinculacaoPartiPolitico = data.Vinculacao
    ? data.Vinculacao.filter(
        (vinculacao) =>
            vinculacao.VinculacaoEntidade.Tipo === "Partido Político"
        )
    : [];

    const vinculacaoEntidade = data.Vinculacao
    ? data.Vinculacao.filter(
        (vinculacao) =>
            vinculacao.VinculacaoEntidade.Tipo != "Partido Político"
        )
    : [];

    
    
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
                        <input type="nome" class="form-control" id="nome" name='Nome' placeholder="Nome" value={data.Nome}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="apelido">Apelido</label>
                        <input type="text" class="form-control" id="apelido" placeholder="Apelido" value={data.Apelido}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="inputEstado">Profissão</label>
                        <select id="inputEstado" class="form-control"  onChange={valueInput}>
                            <option selected>Escolher...</option>
                            {
                                profissoes.map((profissao) => (
                                    
                                    <option key={profissao.IdProfissao} value={profissao.Nome}>{profissao.Nome}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div class="form-group">
                        <label htmlFor="nascimento">Data de Nascimento</label>
                        <input type="date" class="form-control" id="nascimento" value={data.DataNascimento}  onChange={valueInput}  />
                    </div>


                    <div class="form-group">
                        <label htmlFor="classificacao">Classificação</label>
                        <select id="classificacao" class="form-control"   onChange={valueInput}>
                            <option selected>Escolher...</option>
                            
                            {
                                classificacoes.map((classificacao) => (
                                    <option key={classificacao.IdClassificacao} selected={classificacao.Descricao === data?.ClassificacaoApoiador?.Descricao} value={classificacao.Descricao}>{classificacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>


                    <div class="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" class="form-control" onChange={valueInput} >
                            <option selected>Escolher...</option>
                            {
                                situacoes.map((situacao) => (
                                    <option key={situacao.IdSituacao} selected={situacao.Descricao === data?.SituacaoCadastroApoiador?.Descricao} value={situacao.Descricao}>{situacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>


                <div class="form-row">

                    <div class="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" class="form-control" id="email" placeholder="E-mail" value={data.Email}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="telefone">Telefone 
                        <span> <input type="checkbox" id='whatsapp' name='Whatsapp' /> <FaWhatsapp /> </span>
                        </label>
                        <input type="text" class="form-control" name="Telefone" id="telefone" placeholder="Telefone" value={data?.TelefoneApoiador?.Numero}  onChange={valueInput}/>
                    </div>
               
                </div>

                <p className='form-session-title'>Endereço</p>
                <div class="form-row">

                    <div class="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" class="form-control" id="cep" name="CEP" value={data?.EnderecoApoiador?.CEP}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" class="form-control" name="Cidade" id="cidade" placeholder='Cidade' value={data?.EnderecoApoiador?.CidadeApoiador?.Nome}   onChange={valueInput} />
                    </div>
                    
                    <div class="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" class="form-control" name='Estado'  onChange={valueInput} >
                            <option selected>Escolher...</option>
                            {
                                estados.map((estado) => (
                                    <option key={estado.IdEstado} value={estado.UF}>{estado.UF}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div class="form-group">
                        <label htmlFor="endereco">Lagradouro</label>
                        <input type="text" class="form-control" name="Lagradouro" id="endereco" value={data?.EnderecoApoiador?.Lagradouro} onChange={valueInput}  />
                    </div>
                    
                    <div class="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" class="form-control" id="bairro" name="Bairro" value={data?.EnderecoApoiador?.Bairro} onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="bairro">Quadra</label>
                        <input type="text" class="form-control" id="bairro" value={data?.EnderecoApoiador?.Quadra} onChange={valueInput}  />
                    </div>

                    <div class="form-group">
                        <label htmlFor="numero">Numero</label>
                        <input type="text" class="form-control" id="numero" value={data?.EnderecoApoiador?.Numero} onChange={valueInput}  />
                    </div>


                    <div class="form-group">
                        <label htmlFor="complemento">Ponto Referencia</label>
                        <input type="text" class="form-control" id="complemento" value={data?.EnderecoApoiador?.PontoReferencia} onChange={valueInput} />
                    </div>

                </div>

                <p className='form-session-title'>Movimento Social/Sindical/Entidade</p>

                <div class="form-row">

                   <div class="form-group">
                    <p>Movimento ou Entidade ?</p>
                    <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="Entidade" id="entidade" value=""  onChange={valueInput} />
                            <label class="form-check-label" for="entidade">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="Entidade" id="entidade2" value="nao"  onChange={valueInput}  />
                            <label class="form-check-label" for="entidade2">Não</label>
                        </div>
                    </div>


                    <div class="form-group">
                        <label htmlFor="entidadeTipo">Tipo</label>
                       
                        <select id="entidadeTipo" class="form-control" value={vinculacaoEntidade[0]?.VinculacaoEntidade?.Tipo} onChange={valueInput}>
                            <option selected>Escolher...</option>
                           {
                                tiposEntidade.map((tipos) => (
                                    <option key={tipos.IdTipo} selected={tipos.Tipo === vinculacaoEntidade[0]?.VinculacaoEntidade?.Tipo} value={tipos.Tipo}>{tipos.Tipo}</option>
                                ))
                           }
                        </select>
                    </div>

                    <div class="form-group">
                        <label htmlFor="entidadeNome">Nome</label>
                        <input type="text" class="form-control" id="entidadeNome" placeholder='Nome do Movimento Social ou Sindicato' value={vinculacaoEntidade[0]?.VinculacaoEntidade?.Nome}   />
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
                        <input type="text" class="form-control" id="entidadeSigla"  value={vinculacaoEntidade[0]?.VinculacaoEntidade.Sigla} onChange={(e) => setEntidadeSigla(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="entidadeCargo">Cargo</label>
                        <input type="text" class="form-control" id="entidadeCargo" value={vinculacaoEntidade[0]?.Cargo} onChange={(e) => setEntidadeCargo(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <p>Liderança ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="Lideranca" id="lideranca1" value="sim" onChange={(e) => setEntidadeLideranca(e.target.value)}  />
                            <label class="form-check-label" for="lideranca1">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="Lideranca" id="lideranca2" value="nao"  onChange={(e) => setEntidadeLideranca(e.target.value)} />
                            <label class="form-check-label" for="lideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <p className='form-session-title'>Partido Político</p>
                <div class="form-row">
                    
                <div className="form-group">
                    <label htmlFor="partido">Agremiação partidária</label>
                    <select id="partido" className="form-control"  onChange={(e) => setPartido(e.target.value)}>
                        <option >Escolher...</option>
                        {partidos.map((partidoItem) => (
                            <option key={partidoItem.IdEntidade} selected={partidoItem.Nome === vinculacaoPartiPolitico[0]?.VinculacaoEntidade?.Nome}  value={vinculacaoPartiPolitico[0]?.VinculacaoEntidade?.Nome}>
                                {partidoItem.Sigla} - {partidoItem.Nome}
                            </option>
                        ))}
                    </select>
                </div>

                    <div class="form-group">
                        <label htmlFor="partidoCargo">Cargo</label>
                        <input type="text" class="form-control" id="partidoCargo" value={vinculacaoPartiPolitico[0]?.Cargo} onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <p>Liderança ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca1" value="sim" onChange={valueInput} />
                            <label class="form-check-label" for="partidoLideranca1">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca2" value="nao" onChange={valueInput} />
                            <label class="form-check-label" for="partidoLideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="infoAdicional">Anotações Internas</label>
                        <textarea class="form-control" id="infoAdicional" name='InformacaoAdicional'  value={data.InformacaoAdicional} onChange={valueInput} ></textarea>
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