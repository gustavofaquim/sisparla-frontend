import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';

import { useNavigate } from "react-router-dom";


import { FaRegCircleXmark } from "react-icons/fa6";

import "../../styles/components/mensagem/nova.sass";

const NovaMensagem = () => {

    const navigate = useNavigate();
    const [selectedApoiadorId, setSelectedApoiadorId] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [apoiador, setApoiador] = useState([]);

    const [data, setData] = useState([]);
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});


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


    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFilesChange = (e) => {
        const files = e.target.files;

         // Adiciona os arquivos ao array de arquivos selecionados
         setSelectedFiles([...selectedFiles, ...files]);

    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };


    const getFilePreview = (file) => {
        // Verifica se o arquivo é uma imagem para exibir uma prévia
        if (file.type && file.type.startsWith('image/')) {
             // Cria a URL apenas para exibição na prévia
            const previewURL = URL.createObjectURL(file);
            return <img className='arquivo' src={previewURL} alt={file.name} />;
        }

        return <span>{file.name}</span>;
    };


    const sendMessage = async (e) => {
        e.preventDefault();
    
        try {
            const dataToSend = { ...data, selectedApoiadores };
    
            
            // Converte os arquivos para base64 e adiciona ao array de arquivos selecionados
            const selectedFilesData = await Promise.all(selectedFiles.map(async (file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({
                            data: reader.result.split(',')[1], // Remove o prefixo "data:image/png;base64,"
                            name: file.name,
                            type: file.type,
                        });
                    };
                    reader.readAsDataURL(file);
                });
            }));
    
            // Adiciona as URLs dos arquivos aos dados
            dataToSend.selectedFiles = selectedFilesData;
            console.log(dataToSend)
    
            console.log('Dados a serem enviados:', dataToSend);
    
            const response = await userFetch.post('/send', dataToSend);
    
            // Limpa as prévias após o envio
            setSelectedFiles([]);
    
            console.log('Mensagens enviadas com sucesso');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };
    
    


    return(
        <div className="nova-mensagem">
             <h1 className='title-page'>Envio de Mensagens</h1>

             <div className='form-mensagem'>

                <form  onSubmit={sendMessage} encType="multipart/form-data">

                    <div class="form-row">

                        <div class="form-group col-md-7">
                            <label htmlFor="texto">Digite sua mensagem</label>
                            <textarea name='texto' onChange={valueInput} id="texto"></textarea>
                        </div>

                    </div>

                    <div class="form-row">

                        <div class="form-group">
                            <label htmlFor="arquivos">Selecione um arquivo</label>
                            <input type="file" id="arquivos" name="arquivos" multiple onChange={handleFilesChange} />
                        </div>

                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-7">
                             {/* Exibe a prévia dos arquivos selecionados */}
                            <div className="selected-files">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="selected-file">
                                        {getFilePreview(file)}

                                        <FaRegCircleXmark class='btn-remove-arquivo'onClick={() => handleRemoveFile(index)} />
                                    
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div class="form-row">

                        <div class="form-group col-md-7">
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

                        </div>

                    </div>


                    <p className='form-session-title'>Apoiadores para que a mensagem será enviada</p>
                    <div class="form-row">

                        <div class="form-group col-md-7">
                                
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


                    <div className='btn'>
                        <button type="submit" class="btn btn-enviar-mensagem">Enviar Mensagem</button>
                    </div>                   
                   

                </form>


             </div>
        
        </div>
    )
}

export default NovaMensagem;