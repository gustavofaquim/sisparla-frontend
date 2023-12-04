import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import Autosuggest from 'react-autosuggest';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import { FaRegCircleXmark } from "react-icons/fa6";

import '../../styles/components/mensagem/lista-contatos.sass';

const ListaContatos = (propos) => {


    const [selectedApoiadorId, setSelectedApoiadorId] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [apoiador, setApoiador] = useState([]);

    const [data, setData] = useState([]);
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});


    
    const location = useLocation();
    const apoiadoresSelecionados = location.state?.apoiadoresSelecionados || [];

    
    console.log(apoiadoresSelecionados[0])



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
        getApoiadores();
    },[]);


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

    const [selectedApoiadores, setSelectedApoiadores] = useState([]);

    const handleRemoveApoiador = (apoiadorId) => {
        // Filtra o array de apoiadores, removendo o apoiador com o ID correspondente
        const updatedApoiadores = selectedApoiadores.filter(apoiador => apoiador.IdApoiador !== apoiadorId);
        setSelectedApoiadores(updatedApoiadores);
    };

    
    return(
        <div className="lista-contatos">
            <h1 className='title-page'>Lista de Contatos</h1>

            <div>


                <label htmlFor="">Busque e clique sobre o apoiador</label>
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
                        // Adiciona o apoiador selecionado ao array de apoiadores apenas se não estiver presente
                        if (!selectedApoiadores.some(apoiador => apoiador.IdApoiador === suggestion.IdApoiador)) {
                            setSelectedApoiadores([...selectedApoiadores, suggestion]);
                        }
                        setApoiadorInputValue('');
                    }}
                    renderSuggestionsContainer={({ containerProps, children, query }) => (
                    <div
                        {...containerProps}
                        className="custom-suggestions-container">
                        {children}
                    </div>
                    )}

                /> 
                    <p>Apoiadores para que a mensagem será enviada</p>
                    <div>

                    
                            

                        <div>
                                
                            {/* Exibe a lista de apoiadores selecionados */}
                            <div className="selected-apoiadores">
                                {selectedApoiadores.map(apoiador => (
                                    <div key={apoiador.IdApoiador} className="selected-apoiador">
                                        {apoiador.Nome}
                                        <FaRegCircleXmark class='btn-remove-apoiador' onClick={() => handleRemoveApoiador(apoiador.IdApoiador)} />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div> 

                </div>

            </div>
    )
}


export default ListaContatos;