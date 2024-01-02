import * as React from 'react';
import { useState, useEffect } from 'react';
import userFetch from '../axios/config.js';
import { Link } from 'react-router-dom';
import { FaPeopleGroup, FaListUl, FaFaceLaugh, FaFaceSadCry  } from "react-icons/fa6";

import "../styles/components/dashboard.sass";

const Home = () => {

    const [demandas, setDemandas] = useState([]);
    const [demandaSituacao, setDemandaSituacao] = useState([]);
    const [demandasCategoria, setDemandaCategoria] = useState([]);
    const [quantidadeDemandas, setQuantidadeDemandas] = useState([]);
    const [ApoiadoresClassificacao, setApoiadoresClassificacao] = useState([]);
    const [ApoiadoresSituacao, setApoiadoresSituacao] = useState([]);
    const [quantidadeApoiadores, setQuantidadeApoiadores] = useState([]);

    const [minhasDemandas, setMinhasDemandas] = useState([]);
    const [eventosDia, setEventosDia] = useState([]);


    const getDemandas = async() => {

        try {
            const response = await userFetch.get("/view-demandas")
            setDemandaSituacao(response.data[0].DemandasSituacao);
            setDemandaCategoria(response.data[1].DemandasCateogira)
            
            const q1 = response.data[0].DemandasSituacao.length
            const q2 = response.data[1].DemandasCateogira.length

            setQuantidadeDemandas(q1 + q2)
            
        } catch (error) {
            console.log(`Não foi possível obter os dados: ${error}`)
        }
    }

    const getApoiadores = async() => {
        try {
            const response = await userFetch.get("/view-apoiadores");
            setApoiadoresClassificacao(response.data[0].ApoiadoresClassificacao);
            setApoiadoresSituacao(response.data[1].ApoiadoresSituacao);

            const q1 = response.data[0].ApoiadoresClassificacao.length
            const q2 = response.data[1].ApoiadoresSituacao.length
            setQuantidadeApoiadores(q1 + q2);
            
        } catch (error) {
            console.log(`Não foi possível obter os dados: ${error}`)
        }
    }

    const getEventosDia = async() => {
    
        try {
            
            const response = await userFetch.get("/eventos-do-dia")
            const resp = response.data;
           
            setEventosDia(resp);

        } catch (error) {
            console.log(`Erro ao listar os eventos do dia ${error}`);
        }
    }

    const getMinhasDemandas = async() => {

        const id = '1'
        try {
            
            const response = await userFetch.get(`/userDemands/${id}`)

            const resp = response.data;
          
            setMinhasDemandas(resp);


        } catch (error) {
            console.log(`Erro ao listar minhas demandas ${error}`);
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
    

    useEffect(() => {
        getDemandas();
        getApoiadores();
        getEventosDia();
        getMinhasDemandas();
    }, []);


    return(
        <div className="interface-dashboard">
           <h1 className='title-page'>Página Inicial</h1>

           <div className="resumos">
            
            <div className='card apoiadores'>    
           
                <div className='icone'>
                    <FaFaceLaugh /> 
                </div>

                <div className="texto">
                    <h4>{quantidadeApoiadores}</h4>
                    <p className='titulo'>Quantidade de Apoiadores</p>
                </div> 

            </div> 
             
            <div className='card incompletos'>    
           
                <div className='icone'>
                    <FaFaceSadCry /> 
                </div>

                <div className="texto">
                    <h4>{quantidadeApoiadores}</h4>
                    <p className='titulo'>Cadastros Incompletos</p>
                </div> 

            </div>   

            <div className='card demandas'>    
           
                <div className='icone'>
                    <FaListUl /> 
                </div>

                <div className="texto">
                    <h4> {quantidadeDemandas} </h4>
                    <p className='titulo'>Quantidade de Demandas</p>
                </div> 

            </div>

                  
                
             </div>  


            <div className='eventos'>
                <p className='titulo'>Eventos do dia</p>
                {eventosDia.length === 0 ? (
                    <p className=''>Não existem eventos agendados para hoje.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Data e Hora</th>
                            </tr>
                        </thead>

                        <tbody>
                            {eventosDia.map((evento) => (
                                <tr key={evento.IdEvento}>
                                    <td><Link to={`/eventos/${evento.IdEvento}`}>{evento.Nome}</Link></td>
                                    <td>{formataDataEHora(evento?.DataHorario)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}


            </div>

            <div className='minhas-demandas'>
                <p className='titulo'>Minhas Demandas Abertas</p>
                <table>
                <thead>
                    <tr>
                        <th>Assunto</th>
                        <th>Categoria</th>
                        <th>Data de Abertura</th>
                    </tr>
                </thead>

                <tbody>
            
                    {minhasDemandas.length === 0 ? <p>Carregando...</p> : (
                        minhasDemandas.map((demanda) => (
                            <tr key={demanda.IdDemanda}>
                                <td> <Link to={`/demandas/${demanda.IdDemanda}`}>{demanda.Assunto}</Link></td>
                                <td>{demanda?.DemandaCategoria?.Descricao}</td>
                                <td>{formataDataEHora(demanda?.Data)}</td>
                            </tr>
                        
                        ))
                    )}
                </tbody>
            </table>

            </div>


            <div className='area-cards'>


            </div>


          



                

          
            
        </div>
    )
}

export default Home