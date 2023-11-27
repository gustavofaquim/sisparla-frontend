import * as React from 'react';
import { useState, useEffect } from 'react';
import userFetch from '../axios/config.js';
import { Link } from 'react-router-dom';
import { FaPeopleGroup, FaListUl  } from "react-icons/fa6";

import "../styles/components/dashboard.sass";

const Home = () => {

    const [demandas, setDemandas] = useState([]);
    const [demandaSituacao, setDemandaSituacao] = useState([]);
    const [demandasCategoria, setDemandaCategoria] = useState([]);
    const [quantidadeDemandas, setQuantidadeDemandas] = useState([]);
    const [ApoiadoresClassificacao, setApoiadoresClassificacao] = useState([]);
    const [ApoiadoresSituacao, setApoiadoresSituacao] = useState([]);
    const [quantidadeApoiadores, setQuantidadeApoiadores] = useState([]);


    const getDemandas = async() => {

        try {
            const response = await userFetch.get("/view-demandas")
            setDemandaSituacao(response.data[0].DemandasSituacao);
            setDemandaCategoria(response.data[1].DemandasCateogira)

            setQuantidadeDemandas(demandaSituacao.length)
            
        } catch (error) {
            console.log(`Não foi possível obter os dados: ${error}`)
        }
    }

    const getApoiadores = async() => {
        try {
            const response = await userFetch.get("/view-apoiadores");
            setApoiadoresClassificacao(response.data[0].ApoiadoresClassificacao);
            setApoiadoresSituacao(response.data[1].ApoiadoresSituacao);

            setQuantidadeApoiadores((ApoiadoresClassificacao).length);
            
        } catch (error) {
            console.log(`Não foi possível obter os dados: ${error}`)
        }
    }

    useEffect(() => {
        getDemandas();
        getApoiadores();
    }, []);


    return(
        <div className="interface-dashboard">
           <h1 className='title-page'>Dashboard</h1>

           <div className="resumos">
            
            <div className='card apoiadores'>    
           
                <div className='quantidade titulo'>
                    <FaPeopleGroup /> <p> {quantidadeApoiadores} </p>
                </div>

                <div className="texto">
                    <h4 className='titulo'>Quantidade de Apoiadores</h4>
                </div> 

            </div>  

            <div className='card demandas'>    
           
                <div className='quantidade'>
                    <FaListUl /> <p> {quantidadeDemandas} </p>
                </div>

                <div className="texto">
                    <h4 className='titulo'>Quantidade de Demandas</h4>
                </div> 

            </div>      
                
             </div>  



            <div className='area-cards'>

            {demandaSituacao &&
                <>

                <div className="card-dashboard demandas">
                   <div className="titulo"> <p>Demanda</p> </div>

                    <div className='row'>

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

                    </div>
                    
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


                <div className="card h-100 card-dashboard aniversariantes">
                   <div className="titulo"> <p>Aniversariantes</p> </div>
                    
                    <div className='cards-tipo'>
                       
                    </div>

                  
                </div>  



            </div>


          



                

          
            
        </div>
    )
}

export default Home