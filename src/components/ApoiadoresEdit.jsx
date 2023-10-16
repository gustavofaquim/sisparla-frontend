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

    const apoiadorEdit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await userFetch.put(`/apoiadores/${id}`,data);

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
                        <input type="nome" class="form-control" id="nome" name='nome' placeholder="Nome" value={data.Nome}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="apelido">Apelido</label>
                        <input type="text" class="form-control" id="apelido" placeholder="Apelido" value={apelido|| ''} onChange={(e) => setApelido(e.target.value)} />
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
                        <input type="date" class="form-control" id="nascimento" value={data.DataNascimento} onChange={(e) => setNascimento(e.target.value)}  />
                    </div>


                    <div class="form-group">
                        <label htmlFor="classificacao">Classificação</label>
                        <select id="classificacao" class="form-control" value={data.Classificacao} onChange={(e) => setClassificacao(e.target.value)}>
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
                        <select id="situacao" class="form-control" value={data.Situacao} onChange={(e) => setSituacao(e.target.value)} >
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
                        <input type="email" class="form-control" id="email" placeholder="E-mail" value={data.Email}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="telefone">Telefone 
                        <span> <input type="checkbox" id='whatsapp' name='whatsapp' /> <FaWhatsapp /> </span>
                        </label>
                        <input type="text" class="form-control" id="telefone" placeholder="Telefone" value={data?.TelefoneApoiador?.Numero}  onChange={valueInput}/>
                    </div>
               
                </div>

                <p className='form-session-title'>Endereço</p>
                <div class="form-row">

                    <div class="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" class="form-control" id="cep" name="cep" value={data?.EnderecoApoiador?.CEP}  onChange={valueInput} />
                    </div>

                    <div class="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" class="form-control" id="cidade" placeholder='Cidade' vaçue={data?.EnderecoApoiador?.CidadeApoiador?.Nome}   onChange={valueInput} />
                    </div>
                    
                    <div class="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" class="form-control" name='estado'  onChange={valueInput} >
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
                        <input type="text" class="form-control" id="endereco" value={data?.EnderecoApoiador?.Lagradouro} onChange={valueInput}  />
                    </div>
                    
                    <div class="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" class="form-control" id="bairro" value={data?.EnderecoApoiador?.Bairro} onChange={valueInput} />
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
                        <input type="text" class="form-control" id="entidadeNome" placeholder='Nome do Movimento Social ou Sindicato' value={inputValue}   />
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

export default ApoiadoresEdit;