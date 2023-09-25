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
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Apelido</th>
                    <th>E-mail</th>
                    <th>Cidade</th>
                </tr>
           
                {apoiadores.length === 0 ? <p>Carregando...</p> : (
                    apoiadores.map((apoiador) => (
                        <tr key={apoiador.idApoiador}>
                            <td>{apoiador.Nome}</td>
                            <td>{apoiador.Apelido}</td>
                            <td>{apoiador.Email}</td> 
                            <td>{apoiador.Endereco.EnderecoApoiador}</td> 
                        </tr>
                       
                    ))
                )}
            </table>
        </div>
    );

}

export default ApoiadoresList;