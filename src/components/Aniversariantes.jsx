import * as React from 'react';
import { useState, useEffect } from 'react';
import userFetch from '../axios/config.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { IoFilter } from "react-icons/io5";

import { FaWhatsapp } from "react-icons/fa6";

import InsereMascara from './InsereMascara.jsx';

import "../styles/components/filtro.sass";
import "../styles/components/apoiadores-list.sass";
import "../styles/components/aniversariantes.sass";


const Aniversariantes = (props) => {

    const [aniversariantes, setAniversariantes] = useState([]);

    const [periodo, setPeriodo] = useState('');


    useEffect(() => {
        getAniversariantes();
    }, [periodo]);

    const getAniversariantes = async() => {

        try {
            
            const response = await userFetch.get("/aniversariantes", {
                params: {
                    periodo
                },
            })
            const data = response.data;
            setAniversariantes(data);

        } catch (error) {
            console.log(`Ocorreu um erro ao buscar os aniversariantes ${error}`)
        }
    }

    useEffect(() => {
        getAniversariantes();
    }, []);


    function formataData(dataString) {
        
        const data = new Date(`${dataString}T00:00:00-03:00`);
       
        // Verificando se a conversão foi bem-sucedida
        if (isNaN(data.getTime())) {
            return 'Data inválida';
        }

    
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
      
        return `${dia}/${mes}/${ano}`;
    }



    return(
        <div className="listagem-apoiadores">
            <h1 className='title-page'>Aniversariantes</h1>
            <h2 className='subtitle-page'>Apoiadores quem fazem aniversário no dia, semana ou mês.</h2> 

            <div id="accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <IoFilter /> Filtrar Informações
                        </button>
                    </h5>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                       

                    <div className='seletor-filtros'>
               
                        <div className='filtro'>
                            <div>
                                <p>Período</p>
                                <select name="periodo" id="periodo" onChange={(e) => setPeriodo(e.target.value)}>
                                    <option name="periodo" value="dia">Dia</option>
                                    <option name="periodo" value="semana">Semana</option>
                                    <option name="periodo" value="mes">Mês</option>
                                </select>
                            </div>
                        </div>

                       
                        </div>
                    </div>

                    
                    </div>
                </div>
               
            </div>

            {aniversariantes.length === 0 ? <p className='aviso-sem-dados'>Sem aniversáriantes no período selecionado</p> : (
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Nascimento</th>
                        <th className='ocultar-0'>Telefone</th>
                        <th className='ocultar-0 ocultar-1'>E-mail</th>
                        <th className='ocultar-0 ocultar-2'>Cidade</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {aniversariantes.map((aniversariante) => (
                        <tr key={aniversariante.IdApoiador}>
                            <td> <Link to={`/apoiador/${aniversariante.IdApoiador}`}>{aniversariante.Nome}</Link></td>
                            <td>{formataData(aniversariante?.DataNascimento)}</td>
                            <td> <Link to={`https://api.whatsapp.com/send?phone=55${aniversariante.TelefoneApoiador.Numero}`} target="_blank">
                                <FaWhatsapp className='icon-whatsapp'/>
                            </Link> 
                            <InsereMascara className='ocultar-0' tipo='telefone' valor={aniversariante?.TelefoneApoiador?.Numero} ></InsereMascara></td>
                            <td className='ocultar-0 ocultar-1'>{aniversariante?.Email}</td> 
                            <td className='ocultar-0 ocultar-2'>{aniversariante?.EnderecoApoiador?.CidadeApoiador?.Nome}</td> 
                            <td><span className={aniversariante?.SituacaoCadastroApoiador?.Descricao.toLowerCase()}>{aniversariante.SituacaoCadastroApoiador.Descricao}</span></td>
                        </tr>
                    
                    ))}
                </tbody>
            </table>
            )}


           

        </div>
    )
}

export default Aniversariantes;