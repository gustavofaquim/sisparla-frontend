import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";



import { FaRegFloppyDisk } from "react-icons/fa6";


import "../../styles/components/paginas-cadastros-gerais.sass";

const Nova = () => {

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]); 
    const [responsaveis, setResponsaveis] = useState([]);
    const [situacoes, setSituacoes] = useState([]); 
    const [emendaParlamentar, setEmendaParlamentar] = useState([]); 
    const [selectedApoiadorId, setSelectedApoiadorId] = useState(null);


    const [apoiador, setApoiador] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    
    const [data, setData] = useState([]);

    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});

    const getCategorias = async() => {
        try {
            
            const response = await userFetch.get('/categorias-demandas');
            const data = response.data;
            setCategorias(data);

        } catch (error) {
            
            console.log('Erro ao recuperar as categorias de demandas');
        }
    }

    const getSituacoes = async() => {
        try {
            
            const response = await userFetch.get('/situacao-demandas');
            const data = response.data;
            setSituacoes(data);

        } catch (error) {
            console.log('Erro ao recuperar as situações de demandas');
        }
    }

    const getUsers = async() => {
        try {
            const response = await userFetch.get("/lista-usuarios");
            const data = response.data;
            setResponsaveis(data);
        } catch (error) {
            console.log('Erro ao recuperar os usuários');
        }
    }

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
        getApoiadores();
    },[]);


    const createDemanda = async(e) => {
        e.preventDefault();

        try {
            
            const dataToSend = { ...data, idApoiador: selectedApoiadorId };

            const response = await userFetch.post("/demandas", dataToSend);
            
            if(response.status === 200){
                toast.success("Demanda criada com sucesso");
                navigate('/demandas');
            }
            

        } catch (error) {
            toast.error("Houve um erro ao criar a demanda");
            console.log('Erro ao cadastrar a demanda:' + error);
        }
    }

    const [selectedApoiador, setSelectedApoiador] = useState(null);
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

   
    
   

    return(
        <div className="pag-cadastro">
             <h1 className='title-page'>Nova Demanda</h1>
             <h2 className='subtitle-page'>Cadastre uma nova demanda.</h2>


             <div className='form-cadastro'>

                <form  onSubmit={createDemanda}>

                <p className='form-session-title'></p>
                
                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="assunto">Assunto *</label>
                        <input type="assunto" required className="form-control" id="assunto" name='assunto' placeholder="Assunto"  onChange={valueInput} />
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea name='descricao' className="form-control" placeholder="Informe os detalhes da demanda" onChange={valueInput} id="descricao"></textarea>
                    </div>

                </div>

                <div className="form-row">
                    <div class="form-group">
                        <label htmlFor="">Apoiador Solicitante</label>
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
 
                        

                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label htmlFor="categoria">Categoria *</label>
                        <select id="categoria" required className="form-control" name="idCategoria" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                categorias.map((cat) => (
                                    <option key={cat.IdCategoria} value={cat.IdCategoria}> {cat.Descricao} </option>
                                ))
                            }
                        </select>
                    </div>
                            
                    <div className="form-group">
                        <label htmlFor="situacao">Situação *</label>
                        <select id="situacao" required className="form-control" name="idSituacao" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                situacoes.map((sit) => (
                                    <option key={sit.IdSituacao} value={sit.IdSituacao}> {sit.Descricao} </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="valor"> Valor Estimado</label>
                        <input type="number" name="valor" className="form-control" id="valor"  onChange={valueInput} />
                    </div>

                </div>

                <div class="form-row">
                    <div className="form-group">
                        <label htmlFor="responsavel">Responsável</label>
                        <select id="responsavel" className="form-control" name="idResponsavel" onChange={valueInput}>
                            <option selected>Escolher...</option>
                            {
                                responsaveis.map((resp) => (
                                    <option key={resp.IdUsuario} value={resp.IdUsuario}> {resp.Nome} </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="form-row" id='emenda-parlamentar'>
                    
                    <div className="form-group">
                        <p>Emanda Parlamentar ?</p>
                        <div class="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarS" value="S" onChange={valueInput} />
                            <label className="form-check-label" for="emendaParlamentarS">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarN" value="N" onChange={valueInput} />
                            <label className="form-check-label" for="emendaParlamentarN">Não</label>
                        </div>
                    </div>
                
                </div>

                <div>
                    <button type="submit" class="btn btn-primary btn-cadastrar">Salvar</button>
                </div>
                

                </form>

             </div>
        </div>
    )
}

export default Nova;