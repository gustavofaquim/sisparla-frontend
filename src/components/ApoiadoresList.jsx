import React from "react";
import { useState, useEffect } from "react";
import userFetch from "../axios/config.js";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";


const ApoiadoresList = () => {

    const navigate = useNavigate();
    const [apoiadores, setApoiadores] = useState([]);

    const getApoiadores = async() => {

        try {
            
            const response = await userFetch.get("/apoiadores");
            const data = response.data;

            setApoiadores(data);

        } catch (error) {
            console.log(`Ocorreu um erro ao buscar os apoiadores: ${error}`);
        }
    }

    useEffect(() => {
        getApoiadores();
        
    }, []);


    return(
        <div className="listagem-apoiadores">
            <h1>Apoiadores</h1>
            {apoiadores.length === 0 ? <p>Carregando...</p> : (
                apoiadores.map((apoiador) => (
                    <p key={apoiador.idApoiador} >{apoiador.Nome}</p>
                ))
            )}
        </div>
    );

}

export default ApoiadoresList;