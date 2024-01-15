import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from '../../axios/config.js';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaChevronDown, FaTrashCan } from "react-icons/fa6";


import "../../styles/components/listagem.sass";

const DespesasList = () => {

    const [data, setData] = useState([]);

    const getDespesas = async() => {
        
        try {
            
            const response = await userFetch.get('/despesas', {});
            
            const resp = response.data;

            setData(resp);
            console.log(response.data);

        } catch (error) {
            console.log(`Erro ao listar despesas: ${error.message}`);
        }
    };

    useEffect(() => {
        getDespesas();
    },[]);

    return(
        <div className='listagem-demandas'>

        <h1 className='title-page'>Lista de Despesas</h1>
        <h2 className='subtitle-page'>Lista de todas as despesas.</h2>


       

        {data.length === 0 ? <p className='aviso-sem-dados'>Sem despesas para exibir.</p> : (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Descrição</th>
                    <th>Beneficiário</th>
                   
                </tr>
            </thead>

            <tbody>
                    
                    {data.map((despesa) => (
                        
                        <tr key={despesa.IdDespesa}>
                            <td> <Link to={`/despesas/${despesa.IdDespesa}`}>{despesa.IdDespesa}</Link></td>
                            <td>{despesa.Descricao}</td>
                            <td>{despesa.PessoaFisicaJuridica.Nome} </td>
                        </tr>
                    
                    ))}       
            </tbody>
        </table>
        )}

    </div>

    );
};

export default DespesasList;