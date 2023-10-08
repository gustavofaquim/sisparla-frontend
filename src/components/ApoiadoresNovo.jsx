import * as React from 'react';

import userFetch from "../axios/config.js";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/components/apoiador-novo.sass"

import { FaWhatsapp } from "react-icons/fa6";

const ApoiadoresNovo = () => {


    const navigate = useNavigate();

    const [nome, setNome] = useState();
    const [apelido, setApelido] = useState();
    const [profissoes, setProfissoes] = useState([]);
    const [profissao, setProfissao] = useState();
    const [cpf, setCpf] = useState();
    const [religiao, setReligiao] = useState();
    const [nascimento, setNascimento] = useState();
    const [classificacoes, setClassificacoes] = useState([]);
    const [classificacao, setClassificacao] = useState();
    const [email, setEmail] = useState();
    const [telefone, setTelefone] = useState();
    const [situacoes, setSituacoes] = useState([]);
    const [situacao, setSituacao] = useState();
    
    const [cep, setCep] = useState();
    const [cidade, setCidade] = useState();
    const [estados, setEstados] = useState([]);
    const [estado, setEstado] = useState();
    const [lagradouro, setLagradouro] = useState();
    const [quadra, setQuadra] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [pontoReferencia, setPontoReferencia] = useState();

    const [partidos, setPartidos] = useState([]);
    
    const [entidades, setEntidades] = useState([]);
    const [entidade, setEntidade] = useState();
    const [tiposEntidade, setTiposEntidade] = useState([]);
    const [entidadeTipo, setEntidadeTipo] = useState();
    const [entidadeNome, setEntidadeNome] = useState();
    const [entidadeSigla, setEntidadeSigla] = useState();
    const [entidadeCargo, setEntidadeCargo] = useState();
    const [entidadeLideranca, setEntidadeLideranca] = useState();

    const [partido, setPartido] = useState();
    const [partidoCargo, setPartidoCargo] = useState();
    const [partidoLideranca, setPartidoLideranca] = useState();

    const [informacoesAdicionais, setInformacoesAdicionais] = useState();

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedEntidade, setSelectedEntidade] = useState(null);


    const [responseMessage, setResponseMessage] = useState();


    const getProfissoes = async() => {

        try {
            const response = await userFetch.get("/profissoes");

            const data = response.data;
            
            setProfissoes(data);
            
        } catch (error) {
            console.log(`Erro ao recuperar a profissão: ${error}`);
        }
    }

    const getClassificacoes = async() => {
        try {
            
            const response = await userFetch.get("/classificacoes");
            const data = response.data;
            setClassificacoes(data);

        } catch (error) {
            console.log(`Erro ao recuperar as informações de classificações: ${error}`);
        }
    }

    const getSituacoes = async() => {
        try {
            
            const response = await userFetch.get("/situacoesCadastros");            
            const data = response.data;
            setSituacoes(data);

        } catch (error) {
            console.log(`Erro ao recuperar as informações de situacoes cadastrais: ${error}`);
        }
    }

    const getTipoEntidade = async() => {
        try {
            
            const response = await userFetch.get("/tiposEntidade");
            const data = response.data;
            setTiposEntidade(data);

        } catch (error) {
            console.log(`Erro ao recuperar os tipos de entidades: ${error}`);
        }
    }

    const getEstados = async() => {
        try {
            const response = await userFetch.get("/estados");
            const data = response.data;
            setEstados(data);
        } catch (error) {
            console.log(`Erro ao recuperar a lista de estados: ${error}`);
        }
    }

    const getPartidos = async() => {
        try {
            const tipo = 'partido'

            const response = await userFetch.get(`/entidades/${tipo}`);
            const data = response.data;
            
            setPartidos(data);

        } catch (error) {
            console.log(`Erro ao recuperar a lista de partidos: ${error}`);
        }
    }

    const getEntidades = async (filtro) => {
        try {
            const tipo = 'partido';
            const response = await userFetch.get(`/entidadesn/${tipo}`);
            const data = response.data;
    
            const entidadesFiltradas = data.filter(entidade =>
                entidade.Nome.toLowerCase().includes(filtro.toLowerCase())
            );
    
            setEntidades(entidadesFiltradas);  // Atualizar o estado 'entidades'
    
            const nomesEntidades = entidadesFiltradas.map(entidade => entidade.Nome);
    
            setSuggestions(nomesEntidades);
        } catch (error) {
            console.log(`Erro ao recuperar a lista de entidades: ${error}`);
        }
    };

    const createApoiador = async(e) => {
        e.preventDefault();

        try {
            
            const post = {
                nome, apelido, profissao, cpf, religiao, nascimento, classificacao, email, telefone, situacao, 
                cep, cidade, estado, lagradouro, numero, bairro, quadra, pontoReferencia,  
                entidadeNome: entidadeNome || inputValue, entidadeTipo, entidadeSigla, entidadeCargo, entidadeLideranca,
                partido, partidoCargo, partidoLideranca,
                informacoesAdicionais };

            console.log(post);
                
            const response = await userFetch.post("/apoiadores", post);

            const msg = response.data.msg || "Usuário cadastrado com sucesso :) "; 

            setResponseMessage(msg);

            
            navigate('/apoiadores');


        } catch (error) {
            console.log(`Erro ao cadastrar o apoiador: ${error}`);
            setResponseMessage(error);
        }

    };

    useEffect(() => {
        getProfissoes();
        getClassificacoes();
        getSituacoes();
        getTipoEntidade();
        getEstados();
        getPartidos();
        getEntidades();
    }, []);

    useEffect(() => {
        // Atualizar o campo de sigla quando a entidade selecionada muda
        if (selectedEntidade) {
            const siglaInput = document.getElementById('entidadeSigla');
            if (siglaInput) {
                siglaInput.value = selectedEntidade.Sigla || '';
            }
        }
    }, [selectedEntidade, entidades]);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    
        if (value.trim() === '') {
            setEntidadeNome(''); // Definir entidadeNome como string vazia se o campo estiver vazio
            setEntidade(null);
            setSuggestions([]);
        } else {
            // Resetar entidadeNome se uma nova entrada de texto for iniciada
            if (selectedEntidade) {
                setEntidadeNome('');
            }
            getEntidades(value);
        }
    };
    
    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]);
    
        // Encontrar a entidade correspondente ao nome selecionado
        const selectedEntity = entidades.find(entidade => entidade.Nome === suggestion);
    
        // Atualizar os estados 'entidadeNome' e 'entidadeSigla' apenas se a sugestão for clicada
        if (selectedEntity) {
            setEntidadeNome(selectedEntity.Nome);
            setEntidadeSigla(selectedEntity.Sigla);
            setSelectedEntidade(selectedEntity);
        }
    };
    
    
    
    return(

        <div className="cadastrar-apoiador">
           <h1 className='title-page'>Novo Apoiador</h1>
           <h2 className='subtitle-page'>Cadastre um novo apoiador.</h2>

            <div className='form-apoiador'>
                <form onSubmit={createApoiador}>

                <p className='form-session-title'>Informações Pessoais</p>
                <div class="form-row">

                    <div class="form-group col-md-5">
                        <label htmlFor="nome">Nome</label>
                        <input type="nome" class="form-control" id="nome" name='nome' placeholder="Nome" value={nome|| ''} onChange={(e) => setNome(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="apelido">Apelido</label>
                        <input type="text" class="form-control" id="apelido" placeholder="Apelido" value={apelido|| ''} onChange={(e) => setApelido(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="inputEstado">Profissão</label>
                        <select id="inputEstado" class="form-control" value={profissao|| ''} onChange={(e) => setProfissao(e.target.value)}>
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
                        <input type="date" class="form-control" id="nascimento" value={nascimento|| ''} onChange={(e) => setNascimento(e.target.value)}  />
                    </div>


                    <div class="form-group">
                        <label htmlFor="classificacao">Classificação</label>
                        <select id="classificacao" class="form-control" value={classificacao|| ''} onChange={(e) => setClassificacao(e.target.value)}>
                            <option selected>Escolher...</option>
                            
                            {
                                classificacoes.map((classificacao) => (
                                    <option key={classificacao.IdClassificacao} value={classificacao.Descricao}>{classificacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>


                    <div class="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" class="form-control" value={situacao|| ''} onChange={(e) => setSituacao(e.target.value)} >
                            <option selected>Escolher...</option>
                            {
                                situacoes.map((situacao) => (
                                    <option key={situacao.IdSituacao} value={situacao.Descricao}>{situacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>


                <div class="form-row">

                    <div class="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" class="form-control" id="email" placeholder="E-mail" value={email|| ''} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="telefone">Telefone 
                        <span> <input type="checkbox" id='whatsapp' name='whatsapp' /> <FaWhatsapp /> </span>
                        </label>
                        <input type="text" class="form-control" id="telefone" placeholder="Telefone" value={telefone|| ''} onChange={(e) => setTelefone(e.target.value)} />
                    </div>
               
                </div>

                <p className='form-session-title'>Endereço</p>
                <div class="form-row">

                    <div class="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" class="form-control" id="cep" name="cep" value={cep|| ''} onChange={(e) => setCep(e.target.value)}  />
                    </div>

                    <div class="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" class="form-control" id="cidade" placeholder='Cidade' value={cidade|| ''} onChange={(e) => setCidade(e.target.value)}  />
                    </div>
                    
                    <div class="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" class="form-control" name='estado' value={estado|| ''} onChange={(e) => setEstado(e.target.value)} >
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
                        <input type="text" class="form-control" id="endereco" value={lagradouro|| ''} onChange={(e) => setLagradouro(e.target.value)}  />
                    </div>
                    
                    <div class="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" class="form-control" id="bairro" value={bairro|| ''} onChange={(e) => setBairro(e.target.value)}  />
                    </div>

                    <div class="form-group">
                        <label htmlFor="bairro">Quadra</label>
                        <input type="text" class="form-control" id="bairro" value={quadra|| ''} onChange={(e) => setQuadra(e.target.value)}  />
                    </div>

                    <div class="form-group">
                        <label htmlFor="numero">Numero</label>
                        <input type="text" class="form-control" id="numero" value={numero|| ''} onChange={(e) => setNumero(e.target.value)}  />
                    </div>


                    <div class="form-group">
                        <label htmlFor="complemento">Ponto Referencia</label>
                        <input type="text" class="form-control" id="complemento" value={pontoReferencia|| ''} onChange={(e) => setPontoReferencia(e.target.value)}  />
                    </div>

                </div>

                <p className='form-session-title'>Movimento Social/Sindical/Entidade</p>

                <div class="form-row">

                   <div class="form-group">
                    <p>Movimento ou Entidade ?</p>
                    <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="entidade" id="entidade" value="sim" onChange={(e) => setEntidade(e.target.value)} />
                            <label class="form-check-label" for="entidade">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="entidade" id="entidade2" value="nao" onChange={(e) => setEntidade(e.target.value)}  />
                            <label class="form-check-label" for="entidade2">Não</label>
                        </div>
                   </div>


                    <div class="form-group">
                        <label htmlFor="entidadeTipo">Tipo</label>
                        <select id="entidadeTipo" class="form-control"  value={entidadeTipo|| ''} onChange={(e) => setEntidadeTipo(e.target.value)}>
                            <option selected>Escolher...</option>
                           {
                                tiposEntidade.map((tipos) => (
                                    <option key={tipos.IdTipo} value={tipos.Tipo}>{tipos.Tipo}</option>
                                ))
                           }
                        </select>
                    </div>

                    <div class="form-group">
                        <label htmlFor="entidadeNome">Nome</label>
                        <input type="text" class="form-control" id="entidadeNome" placeholder='Nome do Movimento Social ou Sindicato' value={inputValue}  onChange={handleInputChange} />
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
                        <input type="text" class="form-control" id="entidadeSigla"  value={entidadeSigla|| ''} onChange={(e) => setEntidadeSigla(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="entidadeCargo">Cargo</label>
                        <input type="text" class="form-control" id="entidadeCargo" value={entidadeCargo|| ''} onChange={(e) => setEntidadeCargo(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <p>Liderança ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="lideranca" id="lideranca1" value="sim" onChange={(e) => setEntidadeLideranca(e.target.value)}  />
                            <label class="form-check-label" for="lideranca1">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="lideranca" id="lideranca2" value="nao"  onChange={(e) => setEntidadeLideranca(e.target.value)} />
                            <label class="form-check-label" for="lideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <p className='form-session-title'>Partido Político</p>
                <div class="form-row">
                    
                <div className="form-group">
                    <label htmlFor="partido">Agremiação partidária</label>
                    <select id="partido" className="form-control" value={partido || ''} onChange={(e) => setPartido(e.target.value)}>
                        <option disabled>Escolher...</option>
                        {partidos.map((partidoItem) => (
                            <option key={partidoItem.IdEntidade} value={partidoItem.Sigla}>
                                {partidoItem.Sigla} - {partidoItem.Nome}
                            </option>
                        ))}
                    </select>
                </div>

                    <div class="form-group">
                        <label htmlFor="partidoCargo">Cargo</label>
                        <input type="text" class="form-control" id="partidoCargo" value={partidoCargo|| ''} onChange={(e) => setPartidoCargo(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <p>Liderança ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca1" value="sim" onChange={(e) => setPartidoLideranca(e.target.value)} />
                            <label class="form-check-label" for="partidoLideranca1">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca2" value="nao" onChange={(e) => setPartidoLideranca(e.target.value)} />
                            <label class="form-check-label" for="partidoLideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="infoAdicional">Anotações Internas</label>
                        <textarea class="form-control" id="infoAdicional" name='infoAdicional'  value={informacoesAdicionais || ''} onChange={(e) => setInformacoesAdicionais(e.target.value)}></textarea>
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