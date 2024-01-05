import * as React from 'react';

import userFetch from "../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';

import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    
    const [selectedEntidade, setSelectedEntidade] = useState(null);
    const [entidades, setEntidades] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
      
    const [data, setData] = useState({});


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
                console.log(response.data);
                 
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
            
           const response = await userFetch.put(`/apoiadores/${id}`, data);
           toast.success('Apoiador alterado com sucesso!');
           navigate('/apoiadores');

        } catch (error) {
            toast.error('Erro ao alterar informações.');
            console.log('Deu erro:' + error);
        } 
    }

    
    return(

        <div className="cadastrar-apoiador">
           <h1 className='title-page'>Atualizar Dados Cadastrais</h1>
           <h2 className='subtitle-page'>Atualize as informações cadastrais.</h2>

            <div className='form-apoiador'>
                <form onSubmit={(e) => apoiadorEdit(e)}>

                <p className='form-session-title'>Informações Pessoais</p>
                <div className="form-row">

                    <div className="form-group col-md-5">
                        <label htmlFor="nome">Nome</label>
                        <input type="nome" className="form-control" id="nome" name='nome' placeholder="Nome" value={data.nome}  onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="apelido">Apelido</label>
                        <input type="text" className="form-control" id="apelido" placeholder="pelido" name="apelido" value={data.apelido}  onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profissao">Profissão</label>
                        <select id="profissao" name='profissao' className="form-control"  onChange={valueInput}>
                            <option >Escolher...</option>
                            {
                                profissoes.map((profissao) => (
                                    
                                    <option key={profissao.IdProfissao} selected={profissao.Nome === data.profissao}  value={profissao.profissao}>{profissao.Nome}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="religiao">Religião</label>
                        <select id="religiao" name='religiao' className="form-control"  onChange={valueInput}>
                            <option >Escolher...</option>
                            {
                                religioes.map((religiao) => (
                                    <option key={religiao.IdReligiao} selected={religiao.Nome === data.religiao}  value={religiao.Nome}>{religiao.Nome}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nascimento">Data de Nascimento</label>
                        <input type="date" className="form-control" id="dataNascimento" name='dataNascimento' value={data.dataNascimento}  onChange={valueInput}  />
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


                <div className="form-row">

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="E-mail" value={data.email}  onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone 
                        <span> <input type="checkbox" id='whatsapp' checked={data.numeroWhatsapp} name='numeroWhatsapp' onChange={valueInput} /> <FaWhatsapp /> </span>
                        </label>
                        <input type="text" className="form-control" name="numeroTelefone" id="numeroTelefone" placeholder="Telefone" value={data.numeroTelefone}  onChange={valueInput}/>
                    </div>
                    <input type="hidden"  value={data.numeroAntigo} />
               
                </div>

                <p className='form-session-title'>Endereço</p>
                <div className="form-row">

                    <input type="hidden" value={data.idEndereco} onChange={valueInput}  />
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" className="form-control" id="cep" name="cep" value={data.cep}  onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" className="form-control" name="cidade" id="cidade" placeholder='Cidade' value={data.cidade}   onChange={valueInput} />
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
                        <label htmlFor="endereco">Lagradouro</label>
                        <input type="text" className="form-control" name="lagradouro" id="endereco" value={data.lagradouro} onChange={valueInput}  />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" className="form-control" id="bairro" name="bairro" value={data.bairro} onChange={valueInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" className="form-control" id="complmento" value={data.complemento} onChange={valueInput}  />
                    </div>


                    <div className="form-group">
                        <label htmlFor="complemento">Ponto Referencia</label>
                        <input type="text" className="form-control" id="complemento" name="pontoReferencia" value={data.pontoReferencia} onChange={valueInput} />
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
                            <label className="form-check-label" for="lideranca1">Sim</label>
                        </div>
                        
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="entidadeLideranca" id="lideranca2" value="n" checked={data.entidadeLideranca == "n"}  onChange={valueInput} />
                            <label className="form-check-label" for="lideranca2">Não</label>
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
                            <label className="form-check-label" for="partidoLideranca1">Sim</label>
                        </div>
                        
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="partidoLideranca" id="partidoLideranca2" value="n" checked={data.partidoLideranca== "n"} onChange={valueInput} />
                            <label className="form-check-label" for="partidoLideranca2">Não</label>
                        </div>
                   </div>

                </div>

                <div className="form-row">
                    <p className='form-session-title'>Anotações Internas</p>
                    <div className="form-group group-infoAdicional">
                        <label for="infoAdicional"></label>
                        <textarea className="form-control" id="infoAdicional" name='informacaoAdicional'  value={data.informacaoAdicional} onChange={valueInput} ></textarea>
                    </div> 
                </div>

                <div className='btn'>
                    <button type="submit" className="btn btn-primary btn-cadastrar" >Atualizar Dados</button>
                </div>
                

                </form>
            </div>
        </div>
    )
}

export default ApoiadoresEdit;