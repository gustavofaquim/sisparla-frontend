import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from "../axios/config.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCirclePlus, FaMagnifyingGlass } from "react-icons/fa6";


import "../styles/components/apoiadores-list.sass";



const ApoiadoresList = () => {

    const navigate = useNavigate();
    const [apoiadores, setApoiadores] = useState([]);

    const [termoBusca, setTermoBusca] = useState(''); // Estado para o termo de busca

    useEffect(() => {
        getApoiadores();
    }, [termoBusca]);

    const getApoiadores = async() => {


        try {
           console.log(termoBusca);

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

            <div className='novo-apoiador'>
             <Link to={`/novo-apoiador`}><FaCirclePlus /> Adicionar Novo Apoiador</Link>
            </div>
            <div className="filtro-busca">
                <div>
                   
                    <input type="text" placeholder="🔎 Digite um termo de busca" style={{ paddingLeft: '20px' }} value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                    
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Apelido</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Cidade</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
            
                    {apoiadores.length === 0 ? <p>Carregando...</p> : (
                        apoiadores.map((apoiador) => (
                            <tr key={apoiador.IdApoiador}>
                                <td> <Link to={`/apoiador/${apoiador.IdApoiador}`}>{apoiador.Nome}</Link></td>
                                <td>{apoiador.Apelido}</td>
                                <td>{apoiador.Telefone}</td>
                                <td>{apoiador.Email}</td> 
                                <td>{apoiador.EnderecoApoiador.CidadeApoiador.Nome}</td> 
                                <td><span className={apoiador.SituacaoCadastroApoiador.Descricao.toLowerCase()}>{apoiador.SituacaoCadastroApoiador.Descricao}</span></td>
                            </tr>
                        
                        ))
                    )}
                </tbody>
            </table>

        
          
           
            
        </div>
    );

}

export default ApoiadoresList;