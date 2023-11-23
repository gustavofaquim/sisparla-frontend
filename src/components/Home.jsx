import * as React from 'react';
import { useState, useEffect } from 'react';
import userFetch from '../axios/config.js';
import { Link } from 'react-router-dom';

import "../styles/components/dashboard.sass";

const Home = () => {

    const [demandas, setDemandas] = useState([]);
    const [demandaSituacao, setDemandaSituacao] = useState([]);
    const [demandasCategoria, setDemandaCategoria] = useState([]);
    const [ApoiadoresClassificacao, setApoiadoresClassificacao] = useState([]);
    const [ApoiadoresSituacao, setApoiadoresSituacao] = useState([]);


    const getDemandas = async() => {

        try {
            const response = await userFetch.get("/view-demandas")
            setDemandaSituacao(response.data[0].DemandasSituacao);
            setDemandaCategoria(response.data[1].DemandasCateogira)
            
           
            
        } catch (error) {
            console.log(`Não foi possível obter os dados: ${error}`)
        }
    }

    const getApoiadores = async() => {
        try {
            const response = await userFetch.get("/view-apoiadores");

        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDemandas();
        getApoiadores();
    }, []);


    return(
        <div className="interface-dashboard">
           <h1 className='title-page'>Dashboard</h1>

            <div className='area-cards'>
            {demandaSituacao &&
                <>

                <div className="card-dashboard">
                   <div className="titulo"> <h2>Demandas</h2> </div>
                    <div className='cards-tipo'>
                        {demandaSituacao.map((sit) => (
                            <p className="card-text">{sit.quantidade} {sit.tipo}</p>
                        ))}
                    </div>

                    <div className='cards-tipo'>
                        {demandasCategoria.map((sit) => (
                            <p className="card-text">{sit.quantidade} {sit.tipo}</p>
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