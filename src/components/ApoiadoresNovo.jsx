import * as React from 'react';

import userFetch from "../axios/config.js";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Select from 'react-select';
import InputMask from 'react-input-mask';

import "../styles/components/apoiador-novo.sass"

import { FaWhatsapp } from "react-icons/fa6";

import ConsultaCEP from "./ConsultaCEP.jsx";
import RemoveMascara from "./RemoveMascara.jsx";

const ApoiadoresNovo = ({ openModal, updateListaApoiadores }) => {


    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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
    const [uf, setUF] = useState();
    const [logradouro, setLogradouro] = useState();
    const [complemento, setComplemento] = useState();
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

    const [partidoId, setPartidoId] = useState();
    const [partidoCargo, setPartidoCargo] = useState();
    const [partidoLideranca, setPartidoLideranca] = useState();

    const [informacoesAdicionais, setInformacoesAdicionais] = useState();

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedEntidade, setSelectedEntidade] = useState(null);



    const [inputValueProfissao, setInputValueProfissao] = useState('');
    const [selectedProfissao, setSelectedProfissao] = useState(null);
    const [optionsProfissao, setOptionsProfissao] = useState([]);


    const [responseMessage, setResponseMessage] = useState();


    const getProfissoes = async(inputValueProfissao) => {

        try {

            if(inputValueProfissao?.length >= 4){
                
                const response = await userFetch.get("/profissoes", {
                    params: {
                        inputValueProfissao
                    },
                });

                const data = response.data;

                const formattedProfissao = data.map(option => ({
                    value: option.IdProfissao, 
                    label: option.Nome, 
                }));
              
                setOptionsProfissao(formattedProfissao);
    
            }
            
           
            
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

            const response = await userFetch.get(`/partidos/`);
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
                entidade?.Nome?.toLowerCase().includes(filtro.toLowerCase())
            );
    
            setEntidades(entidade);  // Atualizar o estado 'entidades'
    
            const nomesEntidades = entidadesFiltradas.map(entidade => entidade.Nome);
    
            setSuggestions(nomesEntidades);
        } catch (error) {
            console.log(`Erro ao recuperar a lista de entidades: ${error}`);
        }
    };

    const createApoiador = async(e) => {
        e.preventDefault();

        
        try {
            setLoading(true);

            let cepSemMascara = null;
            const telefoneSemMascara = RemoveMascara(telefone);
            let cpfSemMascara = null;
    
            if(cpf){
                cpfSemMascara = RemoveMascara(cpf);
            }

            if(cep){
                cepSemMascara = RemoveMascara(cep);
            }

            const profissao = selectedProfissao?.value || null;
            

            const post = {
                nome, apelido, profissao, cpfSemMascara, religiao, nascimento, classificacao, email, telefoneSemMascara, situacao, 
                cepSemMascara, cidade, estado, logradouro, complemento, bairro, pontoReferencia,  
                entidadeNome: entidadeNome || inputValue, entidadeTipo, entidadeSigla, entidadeCargo, entidadeLideranca,
                partidoId, partidoCargo, partidoLideranca,
                informacoesAdicionais 
            };
          
            const response = await userFetch.post("/apoiadores", post);

            if(response.status == 200){
                
                toast.success('Apoiador cadastrado com sucesso');
            
                updateListaApoiadores();
                    
                // Fechar o modal
                openModal();

                setNome, setApelido, setProfissao, setCpf, setReligiao, setNascimento, setClassificacao, setEmail, setTelefone, setSituacao, 
                setCep, setCidade, setEstado, setLogradouro, setComplemento, setBairro, setPontoReferencia,  
                setEntidadeNome,  setEntidadeTipo, setEntidadeSigla, setEntidadeCargo, setEntidadeLideranca,
                setPartidoId, setPartidoCargo, setPartidoLideranca,
                setInformacoesAdicionais = "";
                
            }

            setLoading(false);
           
            navigate('/apoiadores');

        } catch (error) {
            console.log(`Erro ao cadastrar o apoiador: ${error}`);
            setLoading(false);
            toast.error('Erro ao cadastrar o apoiador');
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

    const handleInputChangeCEP = (e) => {
        setCep(e.target.value);
    };
    
    const handleConsultaCEP = async() => {

        try {
            
            if(cep?.length >= 8){
                const resultadoConsulta  = await ConsultaCEP(cep);
                setLogradouro(resultadoConsulta?.logradouro || null);
                setCidade(resultadoConsulta?.cidade || null);
                setBairro(resultadoConsulta?.bairro || null);
              
              
                if(resultadoConsulta.estado){
                
                    const estadoEncontrado = estados.find(e => e.UF === resultadoConsulta.estado);
                    const idEstado = estadoEncontrado ? estadoEncontrado.IdEstado : null;
                    setEstado(idEstado || null);
                    setUF(estadoEncontrado.UF);
                }
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    const handleChangeProfissao = (selectedProfissao) => {
        setSelectedProfissao(selectedProfissao);
    };
    
    
    return(

        <div className="pag-cadastro">
           <h1 className='title-page'>Novo Apoiador</h1>
           <h2 className='subtitle-page'>Cadastre um novo apoiador.</h2>

            <div className='form-cadastro'>
                <form onSubmit={createApoiador}>

                <p className='form-session-title'>Informações Pessoais</p>
                <hr className='linha-destaque'/>
                <div className="form-row">
                    

                    <div className="form-group col-md-8">
                        <label htmlFor="nome">Nome*</label>
                        <input type="nome" required className="form-control" id="nome" name='nome' value={nome|| ''} onChange={(e) => setNome(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nascimento">Data de Nascimento *</label>
                        <input type="date" required className="form-control" id="nascimento" value={nascimento|| ''} onChange={(e) => setNascimento(e.target.value)}  />
                    </div>  

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone*</label>
                        <span> <input type="checkbox" id='whatsapp' name='whatsapp' /> <FaWhatsapp /> </span>
                        <InputMask required
                            id="telefone" name='telefone' onChange={(e) => setTelefone(e.target.value)}
                            mask="(99) 99999-9999"
                            maskChar="_"
                            className="form-control"  
                        />
                    
                    </div>

                    <div className="form-group col-md-5">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" className="form-control" id="email" value={email|| ''} onChange={(e) => setEmail(e.target.value)} />
                    </div>


                    <div className="form-group">
                        <label htmlFor="inputEstado">Profissão</label>
                        
                        <Select
                            value={selectedProfissao}
                            onInputChange={(value) => {
                                setInputValueProfissao(value);
                                getProfissoes(value);
                            }}
                            onChange={handleChangeProfissao}
                            options={optionsProfissao}
                            isSearchable={true}
                            placeholder="Selecione uma opção..."
                            className="custom-pessoa"
                            noOptionsMessage={() => "Nenhuma opção encontrada"}
                            
                        />
                    </div>

                

                    <div className="form-group">
                        <label htmlFor="classificacao">Classificação*</label>
                        <select id="classificacao" className="form-control" required onChange={(e) => setClassificacao(e.target.value)}>
                            <option selected  value="" disabled>Escolher...</option>
                            {
                                classificacoes.map((classificacao) => (
                                    <option  key={classificacao.IdClassificacao} value={classificacao.Descricao}>{classificacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="situacao">Situação*</label>
                        <select id="situacao" required className="form-control" onChange={(e) => setSituacao(e.target.value)} >
                            <option selected value="" disabled>Escolher...</option>
                            {
                                situacoes.map((situacao) => (
                                    <option key={situacao.IdSituacao} value={situacao.Descricao}>{situacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>


                <div className="form-row">

                </div>

                <p className='form-session-title'>Endereço</p>
                <hr className='linha-destaque'/>
                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label htmlFor="cep">CEP</label>
                        <InputMask
                            className="form-control" id="cep" name="cep" 
                            mask="99999-999"
                            maskChar="_"
                            onChange={handleInputChangeCEP}  
                            onBlur={handleConsultaCEP}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" className="form-control" name='estado' onChange={(e) => setEstado(e.target.value)} >
                            <option selected>Escolher...</option>
                            {
                                estados.map((estado) => (
                                    <option key={estado.IdEstado}  selected={estado.UF === uf} value={estado.IdEstado}>{estado.UF}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group col-md-5">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" className="form-control" id="cidade"  value={cidade} onChange={(e) => setCidade(e.target.value)}  />
                    </div>
                    
                    

                    <div className="form-group">
                        <label htmlFor="endereco">Logradouro</label>
                        <input type="text" className="form-control" id="endereco" value={logradouro} onChange={(e) => setLogradouro(e.target.value)}  />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" className="form-control" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}  />
                    </div>


                    <div className="form-group">
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" className="form-control" id="complmento" value={complemento} onChange={(e) => setComplemento(e.target.value)}  />
                    </div>


                    <div className="form-group">
                        <label htmlFor="complemento">Ponto Referencia</label>
                        <input type="text" className="form-control" id="pontoReferencia" value={pontoReferencia} onChange={(e) => setPontoReferencia(e.target.value)}  />
                    </div>

                </div>

                <p className='form-session-title'>Movimento Social/Sindical/Entidade</p>
                <hr className='linha-destaque'/>

                <div className="form-row">


                    <div className="form-group">
                        <label htmlFor="entidadeTipo">Tipo</label>
                        <select id="entidadeTipo" className="form-control"  value={entidadeTipo|| ''} onChange={(e) => setEntidadeTipo(e.target.value)}>
                            <option selected >Escolher...</option>
                           {
                                tiposEntidade.map((tipos) => (
                                    <option key={tipos.IdTipo} value={tipos.Tipo}>{tipos.Tipo}</option>
                                ))
                           }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="entidadeNome">Nome</label>
                        <input type="text" className="form-control" id="entidadeNome"  value={inputValue}  onChange={handleInputChange} />
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

                    <div className="form-group">
                        <label htmlFor="entidadeSigla">Sigla</label>
                        <input type="text" className="form-control" id="entidadeSigla"  value={entidadeSigla|| ''} onChange={(e) => setEntidadeSigla(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="entidadeCargo">Cargo</label>
                        <input type="text" className="form-control" id="entidadeCargo" value={entidadeCargo|| ''} onChange={(e) => setEntidadeCargo(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <p>Liderança ?</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="lideranca" id="lideranca1" value="s" onChange={(e) => setEntidadeLideranca(e.target.value)}  />
                            <label className="form-check-label" for="lideranca1">Sim</label>
                        </div>
                        
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="lideranca" id="lideranca2" value="n"  onChange={(e) => setEntidadeLideranca(e.target.value)} />
                            <label className="form-check-label" for="lideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <p className='form-session-title'>Partido Político</p>
                <hr className='linha-destaque'/>
                <div className="form-row">
                    
                <div className="form-group">
                    <label htmlFor="partidoId">Agremiação partidária</label>
                    <select id="partidoId" className="form-control" name='partidoId' value={partidoId || ''}  onChange={(e) => setPartidoId(e.target.value)}>
                        <option selected >Escolher...</option>
                        {partidos.map((partidoItem) => (
                            <option key={partidoItem.IdPartido} value={partidoItem.IdPartido}>
                                {partidoItem.Sigla} - {partidoItem.Nome}
                            </option>
                        ))}
                    </select>
                </div>

                    <div className="form-group">
                        <label htmlFor="partidoCargo">Cargo</label>
                        <input type="text" className="form-control" id="partidoCargo" value={partidoCargo|| ''} onChange={(e) => setPartidoCargo(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <p>Liderança ?</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca1" value="s" onChange={(e) => setPartidoLideranca(e.target.value)} />
                            <label className="form-check-label" for="partidoLideranca1">Sim</label>
                        </div>
                        
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca2" value="n" onChange={(e) => setPartidoLideranca(e.target.value)} />
                            <label className="form-check-label" for="partidoLideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <p className='form-session-title'>Anotações Internas</p>
                <hr className='linha-destaque'/>
                <div className="form-row">
                    <div className="form-group group-infoAdicional">
                        <label for="infoAdicional"></label>
                        <textarea className="form-control" id="infoAdicional" name='infoAdicional'  value={informacoesAdicionais || ''} onChange={(e) => setInformacoesAdicionais(e.target.value)}></textarea>
                    </div> 
                </div>

                <div>
                    <button type="submit"  className={loading ? 'btn-cadastrar button-loading' : 'btn-cadastrar'} disabled={loading}>{loading ? 'Salvando Aguarde...' : 'Salvar'}</button>
                </div>
            
                </form>
            </div>
        </div>
    )
}

export default ApoiadoresNovo;