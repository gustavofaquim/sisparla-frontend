import * as React from 'react';

import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';

import { FaRegFloppyDisk } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";


const DemandasEdit = () => {
    
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});
    
    
    const [categorias, setCategorias] = useState([]); 
    const [responsaveis, setResponsaveis] = useState([]);
    const [situacoes, setSituacoes] = useState([]); 


    const [assunto, setAssunto] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [situacao, setSituacao] = useState("");
    const [emandaParlamentar, setEmendaParlamentar] = useState("");
    const [valor, setValor] = useState("");

    const [data, setData] = useState([]); 
    

    const getCategorias = async() => {
        try {
            
            const response = await userFetch('/categorias-demandas');
            const data = response.data;
            setCategorias(data);

        } catch (error) {
            console.log('Erro ao recuperar as categorias de demandas');
        }
    }

    const getSituacoes = async() => {
        try {
            
            const response = await userFetch('/situacao-demandas');
            const data = response.data;
            setSituacoes(data);

        } catch (error) {
            console.log('Erro ao recuperar as situações de demandas');
        }
    }

    const getUsers = async() => {
        try {
            const response = await userFetch("/lista-usuarios");
            const data = response.data;
            setResponsaveis(data);
        } catch (error) {
            console.log('Erro ao recuperar os usuários');
        }
    }


    const getDemanda = async() => {
        try {
            
          if(id === undefined){
            console.log('Demanda não encontrada');
            return;
          }

          await userFetch(`/demandas/${id}`)
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {

                if(error.response){
                    console.log(error.response.data.msg);
                }else{
                    console.log("API não respondeu");
                }
            })

        } catch (error) {
            console.log(`Erro ao recuperar a demanda ${error}`);
        }
    };

    const getApoiadores = async(filtro) => {
        try {
            const response = await userFetch.get(`/apoiadores`);
            const data = response.data;
            
            const apoiadoresFiltrados = data.filter(apoiador =>
                apoiador.Nome.toLowerCase().includes(filtro.toLowerCase())
            );

            setApoiador(apoiadoresFiltrados);
            setSuggestions(apoiadoresFiltrados);
            setSelectedEntidade(null);

        } catch (error) {
            console.log('Erro ao recuperar os apoiadores');
        }
    }


    useEffect(() => {
        getCategorias();
        getSituacoes();
        getUsers();
        getDemanda();
        getApoiadores();
    },[]);

    const [apoiador, setApoiador] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedApoiador, setSelectedApoiador] = useState(data.apoiadorNome | null);
    const [selectedApoiadorId, setSelectedApoiadorId] = useState(data.idApoiador || null);
    const [apoiadorInputValue, setApoiadorInputValue] = useState(data.apoiadorNome || '');

    useEffect(() => {
        if (selectedApoiador) {
            setApoiadorInputValue(selectedApoiador.Nome);
            valueInput({ target: { name: 'apoiadorNome', value: selectedApoiador.Nome } });
        } else if (data.apoiadorNome) {
            setApoiadorInputValue(data.apoiadorNome);
            valueInput({ target: { name: 'apoiadorNome', value: data.apoiadorNome } });
        }
    }, [data.apoiadorNome, selectedApoiador]);

    const handleEntidadeInputChange = (event, { newValue }) => {
        setApoiadorInputValue(newValue);
        setSelectedApoiador(null);
        setSelectedApoiadorId(null);
        valueInput({ target: { name: 'apoiadorNome', value: newValue } });
    };


    const editDemanda = async(e) => {
        e.preventDefault();

        try {
            const dataToSend = { ...data, idApoiador: selectedApoiadorId };
            
            const response = await userFetch.put(`/demandas/${id}`, dataToSend);
            

            if(response.status == '200'){
                navigate('/');
            }
            

        } catch (error) {
            console.log('Erro ao cadastrar a demanda:' + error);
        }
    }


    return(
        <div className="cadastar-demanda">
             <h1 className='title-page'>Atualizar Demanda</h1>
             <h2 className='subtitle-page'>=</h2>


             <div className='form-demanda'>

                <form  onSubmit={editDemanda}>

                <p className='form-session-title'></p>
                
                <div class="form-row">

                    <div class="form-group col-md-7">
                        <label htmlFor="assunto">Assunto</label>
                        <input type="assunto" required class="form-control" id="assunto" name='assunto' placeholder="Assunto" value={data.assunto} onChange={valueInput} />
                    </div>

                </div>

                <div class="form-row">

                    
                    <div class="form-group col-md-7">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea name='descricao' value={data.descricao} onChange={valueInput} id="descricao"></textarea>
                    </div>

                    
                </div>


                <div class="form-row">

                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={({ value }) => getApoiadores(value)}
                        onSuggestionsClearRequested={() => setSuggestions([])}
                        getSuggestionValue={(apoiador) => apoiador.Nome}
                        renderSuggestion={(apoiador) => <div>{apoiador.Nome}</div>}
                        inputProps={{
                            placeholder: 'Digite o nome do apoiador',
                            className: 'form-control',
                            value: selectedApoiador ? selectedApoiador.Nome : apoiadorInputValue,
                            onChange: handleEntidadeInputChange,
                        }}
                        onSuggestionSelected={(event, { suggestion }) => {
                            setSelectedApoiador(suggestion);
                            setSelectedApoiadorId(suggestion.IdApoiador);
                            
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


                <div class="form-row">


                    <div class="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" required class="form-control" name="idCategoria" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                categorias.map((cat) => (
                                    <option key={cat.IdCategoria}  selected={cat.IdCategoria === data.idCategoria}  value={cat.IdCategoria}   > {cat.Descricao} </option>
                                ))
                            }
                        </select>

                     
                    </div>


                    <div class="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" required class="form-control" name="idSituacao" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                situacoes.map((sit) => (
                                    <option key={sit.IdSituacao} value={sit.IdSituacao} selected={sit.IdSituacao === data.idSituacao}  > {sit.Descricao} </option>
                                ))
                            }
                        </select>
                    </div>

                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label htmlFor="responsavel">Responsável</label>
                        <select id="responsavel" class="form-control" name="idResponsavel" onChange={valueInput}>
                            <option selected>Escolher...</option>
                            {
                                responsaveis.map((resp) => (
                                    <option key={resp.IdUsuario} value={resp.IdUsuario}  selected={resp.IdUsuario === data.idResponsavel} > {resp.Nome} </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    
                    <div class="form-group">
                        <p>Emanda Parlamentar ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarS" value="S" checked={data.emendaParlamentar == "S"} onChange={valueInput} />
                            <label class="form-check-label" for="emendaParlamentarS">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarN" value="N" checked={data.emendaParlamentar != "S"} onChange={(e) => setEmendaParlamentar(e.target.value)} />
                            <label class="form-check-label" for="emendaParlamentarN">Não</label>
                        </div>
                    </div>

                    
                    <div class="form-group">
                        <label htmlFor="valor">Valor Estimado</label>
                        <input type="number" name="valor" id="valor" value={data.valor} onChange={valueInput} />
                    </div>

                </div>

                <div className='btn'>
                    <button type="submit" class="btn btn-primary btn-cadastrar"> {<FaRegFloppyDisk />} Cadastrar Demanda</button>
                </div>
                


                </form>

             </div>
        </div>
    )
}

export default DemandasEdit;