import * as React from 'react';
import { useState, useEffect } from 'react';
import userFetch from '../axios/config.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
            <h2 className='subtitle-page'></h2>

            <span>Período</span>
            <div className='seletor-periodo'>
                <div>
                    <select name="periodo" id="periodo" onChange={(e) => setPeriodo(e.target.value)}>
                        <option name="periodo" value="dia">Dia</option>
                        <option name="periodo" value="semana">Semana</option>
                        <option name="periodo" value="mes">Mês</option>
                    </select>
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
                            <td className='ocultar-0'>{aniversariante?.TelefoneApoiador?.Numero}</td>
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