import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import "../../styles/components/listagem.sass";

const Lista = () => {

    const [termoBusca, setTermoBusca] = useState('');
    const [data, setData] = useState([]);


    useEffect(() => {
        getEventos();
    }, [termoBusca]);


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
            <h2 className='subtitle-page'></h2>


            <div className="filtro-busca">
                <div>
                   
                    <input type="text" name="termoBusca" placeholder="🔎 Digite um termo de busca" style={{ paddingLeft: '20px' }} value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} />
                    
                </div>
            </div>


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
            
                    {data.length === 0 ? <p>Carregando...</p> : (
                        data.map((evento) => (
                            <tr key={evento.IdEvento}>
                                <td> <Link to={`/eventos/${evento.IdEvento}`}>{evento.Nome}</Link></td>
                                <td className='ocultar-0'>{evento?.Responsavel}</td>
                                <td>{formataDataEHora(evento?.DataHorario)}</td>
                                <td className='ocultar-1'>{evento?.Relacao}</td>
                            </tr>
                        
                        ))
                    )}
                </tbody>
            </table>

        </div>
    )


}


export default Lista;