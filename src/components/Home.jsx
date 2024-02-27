import * as React from 'react';
import { useState, useEffect } from 'react';
import userFetch from '../axios/config.js';
import { Link } from 'react-router-dom';

import { FaCakeCandles } from "react-icons/fa6";
import { 
    FaUserAlt, 
    FaChartBar
  } from 'react-icons/fa';

import ModalButton from '../components/modal/ModalButton.jsx';
import { Modal, closeAndRefresh } from "../components/modal/Modal.jsx";   
import DemandaEdit from "../components/demandas/Edit.jsx";

import "../styles/components/dashboard.sass";

const Home = () => {


    
    const [quantidadeDemandas, setQuantidadeDemandas] = useState([]);
  
    const [quantidadeApoiadores, setQuantidadeApoiadores] = useState([]);
    const [aniversariantes, setAniversariantes] = useState([]);

    const [minhasDemandas, setMinhasDemandas] = useState([]);
    const [eventosDia, setEventosDia] = useState([]);

    const [IdDemandaAtt, setIdDemandaAtt] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);


    const getCountDemandas = async() => {

        try {
            const response = await userFetch.get("/count-demandas");
            setQuantidadeDemandas(response.data);
            
        } catch (error) {
            console.log(`Não foi possível obter os dados: ${error}`)
        }
    }

    const getCountApoiadores = async() => {
        try {
            
            const response = await userFetch.get("/count-apoiadores");
            setQuantidadeApoiadores(response.data);

        } catch (error) {
            console.log('Não foi possível exibir a quantidade de apoiadores')
        }
    }



    const getAniversariantesDoDia = async() => {

        try {
            const periodo = 'dia';

            const response = await userFetch.get("/aniversariantes", {
                params: {
                    periodo
                },
            })

        
            setAniversariantes(response.data?.length || 0);

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
        getCountDemandas();
        getCountApoiadores();
        getEventosDia();
        getAniversariantesDoDia();
    }, []);

    
    const handleCloseAndRefresh = async () => {
        await closeAndRefresh(setModalOpen, setData, getDemandas); // Certifique-se de passar a função getEventos conforme necessário
    };


    return(
        <div className="interface-dashboard">
           <h1 className='title-page'>Página Inicial</h1>

           <div className="resumos">
            
          
            <div className='cards'>
                <Link to="/apoiadores">
                    <div className='card apoiadores'>    
            
                        <div className='icone'>
                            <FaUserAlt /> 
                        </div>

                        <div className="texto">
                            <h4>{quantidadeApoiadores}</h4>
                            <p className='titulo'>Apoiadores</p>
                        </div> 

                    </div> 
                </Link>
            </div>
             
            <div className='cards'>
                <Link to="/demandas">
                    <div className='card demandas'>    
                
                        <div className='icone'>
                            <FaChartBar /> 
                        </div>

                        <div className="texto">
                            <h4> {quantidadeDemandas} </h4>
                            <p className='titulo'>Demandas</p>
                        </div> 

                    </div>
                </Link>
            </div>
           
            <div className='cards'>
            <Link to="/aniversariantes">
                <div className='card aniversariantes'>    
            
                    <div className='icone'>
                        <FaCakeCandles />
                    </div>

                    <div className="texto">
                        <h4> {aniversariantes} </h4>
                        <p className='titulo'>{aniversariantes > 1 ? 'Aniversariantes' : 'Aniversariante'} Hoje</p>
                    </div> 

                </div>
            </Link>

            </div>
           

                  
                
             </div>  

            <div className='cards-listas'>
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
                    {minhasDemandas.length === 0 ? (
                        <p className=''>Não existem demandas abertas.</p>
                    ) : (

                        <table>
                        <thead>
                            <tr>
                                <th>Assunto</th>
                                <th>Categoria</th>
                                <th>Data de Abertura</th>
                            </tr>
                        </thead>

                            <tbody>
                            { minhasDemandas.map((demanda) => (
                                    <tr key={demanda.IdDemanda}>
                                        <td><ModalButton key={demanda.IdDemanda} isLink onClick={() => { setModalOpen(true); setIdDemandaAtt(demanda.IdDemanda); }}>{demanda.Assunto}</ModalButton></td>
                                        <td>{demanda?.DemandaCategoria?.Descricao}</td>
                                        <td>{formataDataEHora(demanda?.Data)}</td>
                                    </tr>
                                
                                ))}
                            </tbody>
                        </table>
                    
                    )}
                    

                </div>
            </div>
            


            <div className='area-cards'>


            </div>

            
            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                
                <DemandaEdit
                    closeAndRefresh={handleCloseAndRefresh}
                    IdDemandaAtt={IdDemandaAtt}
                    modalOpen={modalOpen}  
                  />
                
            </Modal>

            
        </div>
    )
}

export default Home