import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from "../axios/config.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import "../styles/components/apoiadores-list.sass";


const ApoiadoresList = () => {

    const navigate = useNavigate();
    const [apoiadores, setApoiadores] = useState([]);

    const [termoBusca, setTermoBusca] = useState(''); // Estado para o termo de busca





    const getApoiadores = async() => {


        try {
           
            const response = await userFetch.get("/apoiadores", {
                params: {
                    termoBusca
                },
            });
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
            <h1 className='title-page'>Listagem de Apoiadores</h1>
            <h2 className='subtitle-page'>Lista de todos os eleitores ativos, desativos e com cadastro incompleto.</h2>


            <div className="filtro-busca">
                <input type="text" placeholder="Digite um termo de busca" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>

                <button onClick={() => getApoiadores()}>Buscar</button>
            </div>

            <table>
                <tr>
                    <th>Nome</th>
                    <th>Apelido</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>Cidade</th>
                    <th>Status</th>
                </tr>
           
                {apoiadores.length === 0 ? <p>Carregando...</p> : (
                    apoiadores.map((apoiador) => (
                        
                        <tr key={apoiador.idApoiador}>
                            <td>{apoiador.Nome}</td>
                            <td>{apoiador.Apelido}</td>
                            <td>{apoiador.Telefone}</td>
                            <td>{apoiador.Email}</td> 
                            <td>{apoiador.EnderecoApoiador.CidadeApoiador.Nome}</td> 
                            <td><span className={apoiador.SituacaoCadastroApoiador.Descricao.toLowerCase()}>{apoiador.SituacaoCadastroApoiador.Descricao}</span></td>
                        </tr>
                       
                    ))
                )}
            </table>

        
          
           
            
        </div>
    );

}

export default ApoiadoresList;