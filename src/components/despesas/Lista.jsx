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
        <div>Olá</div>
    );
};

export default DespesasList;