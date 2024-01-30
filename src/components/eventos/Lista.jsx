import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import { IoAddSharp } from "react-icons/io5";

import "../../styles/components/listagem.sass";

const Lista = () => {

    const [termoBusca, setTermoBusca] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        getEventos();
    }, []);


    const getEventos = async() => {

        try {

            const response = await userFetch.get("/eventos", {
                params: {
                    termoBusca
                }
            })

            const resp = response.data;
            setData(resp);

        } catch (error) {
            console.log(`Erro ao listar os eventos ${error}`);
        }
    }

    useEffect(() => {
        if (termoBusca.length >= 3) {
            getEventos();

        } else if(termoBusca === ''){
            getEventos();
        }
    }, [termoBusca]);


    function formataDataEHora(dataString) {
        const data = new Date(dataString);
    
        // Verificando se a conversão foi bem-sucedida
        if (isNaN(data.getTime())) {
            return '-----';
        }
    
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
    
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
    
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    }
    


    return(
        <div className='listagem-demandas'>
            
            <h1 className='title-page'>Lista de Eventos</h1>
            <h2 className='subtitle-page'>Eventos, atividades e compromissos.</h2>


            <div id="accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            🔎 Filtrar Informações
                        </button>
                    </h5>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                       
                    <div className="filtro-busca">
                        <div>
                            <label htmlFor="busca">Digite um termo para buscar</label>
                            <input type="text" id='busca' placeholder="Pesquise pelo nome do evento, responsável ou por outros dados." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                        </div>
                    </div>

                    </div>

                    
                    </div>
                </div>
               
            </div>
            
            

            <div className='btn-add'>
                <Link to={"/novo-evento"}><button><IoAddSharp /> Novo Evento</button></Link>
            </div>


            {data.length === 0 ? <p className='aviso-sem-dados'>Sem eventos para exibir.</p> : (
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th className='ocultar-0'>Responsável</th>
                        <th>Data e Hora</th>
                        <th className='ocultar-1'>Relação</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((evento) => (
                        <tr key={evento.IdEvento}>
                            <td> <Link to={`/eventos/${evento.IdEvento}`}>{evento.Nome}</Link></td>
                            <td className='ocultar-0'>{evento?.Responsavel}</td>
                            <td>{formataDataEHora(evento?.DataHorario)}</td>
                            <td className='ocultar-1'>{evento?.Relacao}</td>
                        </tr>
                    
                    ))}  
                </tbody>
            </table>
            )}

        </div>
    )


}


export default Lista;