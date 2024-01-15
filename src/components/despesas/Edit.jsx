import * as React from 'react';

import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';
import { toast } from 'react-toastify';

import { FaRegFloppyDisk } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";


const DespesasEdit = () => {

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();


    const [data, setData] = useState([]); 
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});


    const getDespesas = async() => {

        try {
            
            if(id === undefined){
                console.log('Despesa não encontrada');
                return;
            }

            await userFetch(`/despesas/${id}`)
                .then((response) => {
                    setData(response.data)
                })
                .catch((error) => {
                    if(error.response){
                        console.log(error.response.data.msg);
                    }else{
                        console.log('API não respondeu');
                    }
                })

        } catch (error) {
            console.log('Erro ao recuperar a despesa.')
        }
    }

    useEffect(() => {
        getDespesas();
    },[]);
}

export default DespesasEdit;