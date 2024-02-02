import * as React from 'react';

import userFetch from "../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';

import Select from 'react-select';
import InputMask from 'react-input-mask';

import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/components/apoiador-novo.sass"


import DeleteClick from '../components/DeleteClick.jsx';

import { FaWhatsapp } from "react-icons/fa6";

import ConsultaCEP from "./ConsultaCEP.jsx";
import RemoveMascara from "./RemoveMascara.jsx";


const ApoiadoresEdit = () => {

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [profissoes, setProfissoes] = useState([]);
    const [classificacoes, setClassificacoes] = useState([]);
    const [religioes, setReligioes] = useState([]);
    const [situacoes, setSituacoes] = useState([]);
    const [estados, setEstados] = useState([]);
    const [partidos, setPartidos] = useState([]);
    const [tiposEntidade, setTiposEntidade] = useState([]);
    const [partido, setPartido] = useState();
    
    const [selectedEntidade, setSelectedEntidade] = useState(null);
    const [entidades, setEntidades] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
      
    const [data, setData] = useState({});

    const [inputValueProfissao, setInputValueProfissao] = useState('');
    const [selectedProfissao, setSelectedProfissao] = useState(null);
    const [optionsProfissao, setOptionsProfissao] = useState([]);


    const onSuggestionsFetchRequested = ({ value }) => {
        getEntidades(value); // Chame sua função existente para obter entidades
      };
      
      const onSuggestionsClearRequested = () => {
        setSuggestions([]); // Limpe as sugestões quando necessário
      };

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

    const getEntidades = async (filtro) => {
        try {
            const tipo = 'partido';
            const response = await userFetch.get(`/entidadesn/${tipo}`);
            const data = response.data;
    
            const entidadesFiltradas = data.filter(entidade =>
                entidade.Nome.toLowerCase().includes(filtro.toLowerCase())
            );
    
            setEntidades(entidadesFiltradas);
            setSuggestions(entidadesFiltradas);
            setSelectedEntidade(null);
        } catch (error) {
            console.log(`Erro ao recuperar a lista de entidades: ${error}`);
        }
    };


    const getPartidos = async() => {
        try {
        
            const response = await userFetch.get(`/partidos/`);
            const data = response.data;
            
            setPartidos(data);

        } catch (error) {
            console.log(`Erro ao recuperar a lista de partidos: ${error}`);
        }
    };

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
    
    const [entidadeInputValue, setEntidadeInputValue] = useState(data.entidadeNome || '');

    useEffect(() => {
        if (selectedEntidade) {
            setEntidadeInputValue(selectedEntidade.Nome);
            valueInput({ target: { name: 'entidadeNome', value: selectedEntidade.Nome } });
        } else if (data.entidadeNome) {
            setEntidadeInputValue(data.entidadeNome);
            valueInput({ target: { name: 'entidadeNome', value: data.entidadeNome } });
        }
    }, [data.entidadeNome, selectedEntidade]);


    const handleEntidadeInputChange = (event, { newValue }) => {
        setEntidadeInputValue(newValue);
        setSelectedEntidade(null);
        valueInput({ target: { name: 'entidadeNome', value: newValue } });
    };


    const apoiadorEdit = async (e) => {
        e.preventDefault();

       try {
        
            setLoading(true);
            await userFetch.put(`/apoiadores/${id}`, data);
            toast.success('Apoiador alterado com sucesso!');
            navigate('/apoiadores');
            setLoading(false);

        } catch (error) {
            toast.error('Erro ao alterar informações.');
            console.log('Deu erro:' + error);
            setLoading(false);
        } 
    }

    const deleteApoiador = async() => {
        
        try {
            
            const response = await userFetch.delete(`/apoiador/${id}`);
            
            if(response.status === 200){
                navigate('/apoiadores');
            }

        } catch (error) {
            toast.error('Erro ao excluir o apoiador.');
            console.log(`Error: ` + error)
        }
    }

    const handleChangeProfissao = (selectedProfissao) => {
        setSelectedProfissao(selectedProfissao);
    };

    const handleConsultaCEP = async() => {

        try {
            
            
            if(RemoveMascara(data.cep)?.length >= 8){
                const resultadoConsulta  = await ConsultaCEP(RemoveMascara(data.cep));
                
                data.logradouro = resultadoConsulta?.logradouro
                data.cidade = resultadoConsulta?.cidade
                data.bairro = resultadoConsulta?.bairro
                
                
                if(resultadoConsulta.estado){
                
                    const estadoEncontrado = estados.find(e => e.UF === resultadoConsulta.estado);
                    const idEstado = estadoEncontrado ? estadoEncontrado.IdEstado : null;
                    setData({...data, 'estado' : idEstado})
                    data.estado = idEstado;
                }

                console.log(data);
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    const handleInputChangeCEP = (e) => {
        setData({...data, 'cep' : e.target.value})
    };

    
    return(

        <div className="pag-cadastro">
           <h1 className='title-page'>Atualizar Dados Cadastrais</h1>
           <h2 className='subtitle-page'>Atualize as informações cadastrais.</h2>

            <div className='form-cadastro'>
                <form onSubmit={(e) => apoiadorEdit(e)}>

                <p className='form-session-title'>Informações Pessoais</p>
                <div className="form-row">

                    <div className="form-group col-md-8">
                        <label htmlFor="nome">Nome</label>
                        <input type="nome" className="form-control" id="nome" name='nome' placeholder="Nome" value={data.nome}  onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nascimento">Data de Nascimento*</label>
                        <input type="date" className="form-control" id="dataNascimento" name='dataNascimento' value={data.dataNascimento}  onChange={valueInput}  />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone*</label> 
                        <span> <input type="checkbox" id='whatsapp' checked={data.numeroWhatsapp} name='numeroWhatsapp' onChange={valueInput} /> <FaWhatsapp /> </span>
                        <InputMask required
                            id="numeroTelefone" name="numeroTelefone"  value={data.numeroTelefone}  onChange={valueInput}
                            mask="(99) 99999-9999"
                            maskChar="_"
                            className="form-control"  
                        />
                    </div>
                    <input type="hidden"  value={data.numeroAntigo} />

                    <div className="form-group col-md-5">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="E-mail" value={data.email}  onChange={valueInput} />
                    </div>


                    <div className="form-group">
                        <label htmlFor="profissao">Profissão</label>
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
                        <label htmlFor="classificacao">Classificação</label>
                        <select id="classificacao" className="form-control"  name='idClassificacao'  onChange={valueInput}>
                            <option selected>Escolher...</option>
                            
                            {
                                classificacoes.map((classificacao) => (
                                    <option key={classificacao.idClassificacao} selected={classificacao.idClassificacao === data.idClassificacao} value={classificacao.idClassificacao}>{classificacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" className="form-control" name="idSituacao" onChange={valueInput} >
                            <option selected>Escolher...</option>
                            {
                                situacoes.map((situacao) => (
                                    <option key={situacao.idSituacao} selected={situacao.idSituacao === data.idSituacao} value={situacao.idSituacao}>{situacao.Descricao}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>



                <p className='form-session-title'>Endereço</p>
                <div className="form-row">

                    <input type="hidden" value={data.idEndereco} onChange={valueInput}  />
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <InputMask
                            className="form-control" id="cep" name="cep" value={data.cep}
                            mask="99999-999"
                            maskChar="_"
                            onChange={handleInputChangeCEP}  
                            onBlur={handleConsultaCEP}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" className="form-control" name='estado'  onChange={valueInput} >
                            <option selected>Escolher...</option>
                            {
                                estados.map((estado) => (
                                    <option key={estado.IdEstado} selected={estado.IdEstado === data.estado}  value={estado.IdEstado}>{estado.UF}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" className="form-control" name="cidade" id="cidade" placeholder='Cidade' value={data.cidade}   onChange={valueInput} />
                    </div>
                    

                    <div className="form-group">
                        <label htmlFor="endereco">Logradouro</label>
                        <input type="text" className="form-control" name="logradouro" id="endereco" value={data.logradouro} onChange={valueInput}  />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" className="form-control" id="bairro" name="bairro" value={data.bairro} onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" className="form-control" id="complemento" name='complemento' value={data.complemento} onChange={valueInput}  />
                    </div>


                    <div className="form-group">
                        <label htmlFor="pontoReferencia">Ponto Referencia</label>
                        <input type="text" className="form-control" id="pontoReferencia" name="pontoReferencia" value={data.pontoReferencia} onChange={valueInput} />
                    </div>

                </div>

                <p className='form-session-title'>Movimento Social/Sindical/Entidade</p>

                <div className="form-row">


                    <div className="form-group">
                        <label htmlFor="entidadeTipo">Tipo</label>
                       
                        <select id="entidadeTipo" className="form-control" name="entidadeTipo" value={data.entidadeTipo} onChange={valueInput}>
                            <option selected>Escolher...</option>
                           {
                                tiposEntidade.map((tipos) => (
                                    <option key={tipos.IdTipo} selected={tipos.Tipo === data.entidadeTipo} value={tipos.Tipo}>{tipos.Tipo}</option>
                                ))
                           }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="entidadeNome">Nome</label>
                           
                        <Autosuggest
                             suggestions={suggestions}
                             onSuggestionsFetchRequested={({ value }) => getEntidades(value)}
                             onSuggestionsClearRequested={() => setSuggestions([])}
                             getSuggestionValue={(entidade) => entidade.Nome}
                             renderSuggestion={(entidade) => <div>{entidade.Nome}</div>}
                             inputProps={{
                                 placeholder: 'Digite o nome da entidade',
                                 className: 'form-control',
                                 value: selectedEntidade ? selectedEntidade.Nome : entidadeInputValue,
                                 onChange: handleEntidadeInputChange,
                             }}
                             onSuggestionSelected={(event, { suggestion }) => {
                                 setSelectedEntidade(suggestion);
                                 valueInput({ target: { name: 'entidadeSigla', value: suggestion.Sigla }, clasName: 'autosuggest' });
                             }}
                             renderSuggestionsContainer={({ containerProps, children, query }) => (
                                <div
                                    {...containerProps}
                                    className="custom-suggestions-container"
                                >
                                    {children}
                                </div>
                            )}
                        />   
                    </div>

                    <div className="form-group">
                        <label htmlFor="entidadeSigla">Sigla</label>
                        <input type="text" className="form-control" id="entidadeSigla" name="entidadeSigla"  value={data.entidadeSigla} onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="entidadeCargo">Cargo</label>
                        <input type="text" className="form-control" id="entidadeCargo" name="entidadeCargo" value={data.entidadeCargo} onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <p>Liderança ?</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="entidadeLideranca" id="lideranca1" value="s" checked={data.entidadeLideranca == "s"} onChange={valueInput} />
                            <label className="form-check-label" htmlFor="lideranca1">Sim</label>
                        </div>
                        
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="entidadeLideranca" id="lideranca2" value="n" checked={data.entidadeLideranca == "n"}  onChange={valueInput} />
                            <label className="form-check-label" htmlFor="lideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <p className='form-session-title'>Partido Político</p>
                <div className="form-row">
                    
                <div className="form-group">
                    <label htmlFor="partido">Agremiação partidária</label>
                    <select id="partido" className="form-control" name="partidoId" onChange={valueInput}>
                        <option >Escolher...</option>
                        {partidos.map((partidoItem) => (
                            <option key={partidoItem.IdPartido} selected={partidoItem.IdPartido === data.partidoId}  value={partidoItem.IdPartido}>
                                {partidoItem.Sigla} - {partidoItem.Nome}
                            </option>
                        ))}
                    </select>
                </div>

                    <div className="form-group">
                        <label htmlFor="partidoCargo">Cargo</label>
                        <input type="text" className="form-control" id="partidoCargo" name="partidoCargo" value={data.partidoCargo} onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <p>Liderança ?</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca1" value="s" checked={data.partidoLideranca == "s"} onChange={valueInput} />
                            <label className="form-check-label" htmlFor="partidoLideranca1">Sim</label>
                        </div>
                        
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca2" value="n" checked={data.partidoLideranca== "n"} onChange={valueInput} />
                            <label className="form-check-label" htmlFor="partidoLideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <div className="form-row">
                    <p className='form-session-title'>Anotações Internas</p>
                    <div className="form-group group-infoAdicional">
                        <label htmlFor="infoAdicional"></label>
                        <textarea className="form-control" id="infoAdicional" name='informacaoAdicional'  value={data.informacaoAdicional} onChange={valueInput} ></textarea>
                    </div> 
                </div>

                <div className='div-buttons'>
                    <button type="submit" className={loading ? 'btn btn-cadastrar button-loading' : 'btn btn-cadastrar'} disabled={loading}>{loading ? 'Salvando Aguarde...' : 'Salvar'}</button>
                    <button onClick={(e) => DeleteClick(e, deleteApoiador)}  className="btn btn-excluir">Excluir</button>
                </div>
                

                </form>
            </div>
        </div>
    )
}

export default ApoiadoresEdit;