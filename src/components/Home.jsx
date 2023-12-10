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

    const [data, setData] = useState([]);

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

    const getEventos = async() => {

        try {
            
            const response = await userFetch.get("/eventos", {})

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
    

    useEffect(() => {
        getDemandas();
        getApoiadores();
        getEventos();
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
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data e Hora</th>
                        </tr>
                    </thead>

                    <tbody>
                
                        {data.length === 0 ? <p>Carregando...</p> : (
                            data.map((evento) => (
                                <tr key={evento.IdEvento}>
                                    <td> <Link to={`/eventos/${evento.IdEvento}`}>{evento.Nome}</Link></td>
                                    <td>{formataDataEHora(evento?.DataHorario)}</td>
                                </tr>
                            
                            ))
                        )}
                    </tbody>
                </table>

            </div>


            <div className='area-cards'>

            {demandaSituacao &&
                <>

               
                <div className='col cards-tipo'>
                    Tipo
                    {demandaSituacao.map((sit) => (
                        <p className="card-text"><span>{sit.quantidade}</span> - {sit.tipo}</p>
                    ))}
                </div>


                <div className='col cards-tipo'>
                    Categoria
                    {demandasCategoria.map((cat) => (
                        <p className="card-text"> <span>{cat.quantidade}</span> - {cat.tipo}</p>
                    ))}
                </div>         
                        

                 
                </>
            }

            


            {ApoiadoresSituacao &&
                <>

                <div className="card h-100 card-dashboard apoiadores">
                   <div className="titulo"> <p>Apoiadores</p> </div>
                    
                    <div className='cards-tipo'>
                        {ApoiadoresSituacao.map((sit) => (
                            <p className="card-text">{sit.quantidade} - {sit.tipo}</p>
                        ))}
                    </div>

                    <div className='cards-tipo'>
                        {ApoiadoresClassificacao.map((cat) => (
                            <p className="card-text">{cat.quantidade} - {cat.tipo}</p>
                        ))}
                    </div>

                </div>  
                </>
            }


            </div>


          



                

          
            
        </div>
    )
}

export default Home