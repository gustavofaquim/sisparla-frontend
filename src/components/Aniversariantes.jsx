import * as React from 'react';
import { useState, useEffect } from 'react';
import userFetch from '../axios/config.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


import "../styles/components/apoiadores-list.sass";
import "../styles/components/aniversariantes.sass";


const Aniversariantes = () => {

    const [aniversariantes, setAniversariantes] = useState([]);

    const [periodo, setPeriodo] = useState('');


    useEffect(() => {
        getAniversariantes();
    }, [periodo]);

    const getAniversariantes = async() => {

        console.log(periodo)
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
            <h2 className='subtitle-page'></h2>

            <div className='seletor-periodo'>
                <div>
                    <select name="periodo" id="periodo" onChange={(e) => setPeriodo(e.target.value)}>
                        <option name="periodo" value="dia">Dia</option>
                        <option name="periodo" value="semana">Semana</option>
                        <option name="periodo" value="mes">Mês</option>
                    </select>
                </div>
            </div>


            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Nascimento</th>
                        <th>Apelido</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Cidade</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
            
                    {aniversariantes.length === 0 ? <p>Carregando...</p> : (
                        aniversariantes.map((aniversariante) => (
                            <tr key={aniversariante.IdApoiador}>
                                <td> <Link to={`/apoiador/${aniversariante.IdApoiador}`}>{aniversariante.Nome}</Link></td>
                                <td>{formataData(aniversariante?.DataNascimento)}</td>
                                <td>{aniversariante?.Apelido}</td>
                                <td>{aniversariante?.Telefone}</td>
                                <td>{aniversariante?.Email}</td> 
                                <td>{aniversariante?.EnderecoApoiador?.CidadeApoiador?.Nome}</td> 
                                <td><span className={aniversariante?.SituacaoCadastroApoiador?.Descricao.toLowerCase()}>{aniversariante.SituacaoCadastroApoiador.Descricao}</span></td>
                            </tr>
                        
                        ))
                    )}
                </tbody>
            </table>

        </div>
    )
}

export default Aniversariantes;