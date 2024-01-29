import * as React from 'react';

import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';
import { toast } from 'react-toastify';

import { FaRegFloppyDisk } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";

import "../../styles/components/paginas-cadastros-gerais.sass";

import DeleteClick from '../DeleteClick.jsx';


const DemandasEdit = () => {
    
    const params = useParams();
    const id = params?.id;
    
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
                toast.success('Demanda atualizada com sucesso');
                navigate('/');
            }
            

        } catch (error) {
            console.log('Erro ao cadastrar a demanda:' + error);
            toast.error('Erro ao atualizar demanda')
        }
    }

    const deletaDemanda = async() => {
        try {
            
            const response = await userFetch.delete(`demandas/${id}`);
            if(response.status === 200){
                navigate('/demandas');
                toast.success('Demanda removida com sucesso');
            }
           

        } catch (error) {
            console.log(`Não foi possível deletar a demanda: ${error}`);
        }
    }


    return(
        <div className="pag-cadastro">
             <h1 className='title-page'>Atualizar Demanda</h1>
             <h2 className='subtitle-page'>Altere informações da demanda criada.</h2>


             <div className='form-cadastro'>

                <form  onSubmit={editDemanda}>

                <p className='form-session-title'></p>
                
                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="assunto">Assunto</label>
                        <input type="assunto" required className="form-control" id="assunto" name='assunto' placeholder="Assunto" value={data.assunto} onChange={valueInput} />
                    </div>

                </div>

                <div className="form-row">

                    
                    <div className="form-group col-md-7">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea className="form-control" spellCheck="true" lang='pt-br' name='descricao' value={data.descricao} onChange={valueInput} id="descricao"></textarea>
                    </div>

                    
                </div>


                <div className="form-row">

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


                <div className="form-row">


                    <div className="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" required className="form-control" name="idCategoria" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                categorias.map((cat) => (
                                    <option key={cat.IdCategoria}  selected={cat.IdCategoria === data.idCategoria}  value={cat.IdCategoria}   > {cat.Descricao} </option>
                                ))
                            }
                        </select>

                     
                    </div>


                    <div className="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" required className="form-control" name="idSituacao" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                situacoes.map((sit) => (
                                    <option key={sit.IdSituacao} value={sit.IdSituacao} selected={sit.IdSituacao === data.idSituacao}  > {sit.Descricao} </option>
                                ))
                            }
                        </select>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="responsavel">Responsável</label>
                        <select id="responsavel" className="form-control" name="idResponsavel" onChange={valueInput}>
                            <option selected>Escolher...</option>
                            {
                                responsaveis.map((resp) => (
                                    <option key={resp.IdUsuario} value={resp.IdUsuario}  selected={resp.IdUsuario === data.idResponsavel} > {resp.Nome} </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    
                    <div className="form-group">
                        <p>Emanda Parlamentar ?</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarS" value="S" checked={data.emendaParlamentar == "S"} onChange={valueInput} />
                            <label className="form-check-label" for="emendaParlamentarS">Sim</label>
                        </div>
                        
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarN" value="N" checked={data.emendaParlamentar != "S"} onChange={(e) => setEmendaParlamentar(e.target.value)} />
                            <label className="form-check-label" for="emendaParlamentarN">Não</label>
                        </div>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="valor">Valor Estimado</label>
                        <input type="number"  className="form-control" name="valor" id="valor" value={data.valor} onChange={valueInput} />
                    </div>

                </div>



                <div className='div-buttons'>
                    <button type="submit" className="btn btn-cadastrar">Salvar</button>
                    <button onClick={(e) => DeleteClick(e,deletaDemanda)} className="btn btn-excluir">Excluir </button>
                </div>
                


                </form>

             </div>
        </div>
    )
}

export default DemandasEdit;