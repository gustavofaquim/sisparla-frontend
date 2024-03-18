import userFetch from "../../axios/config.js";
import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';

import BtnAddEdit from "../btn/BtnAddEdit.jsx";

const GrupoEditar = ({closeAndRefresh, IdUpdate, modalOpen }) => {

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState(null);
    const [options, setOptions] = useState([]);


    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});


    const getUsuario = async(inputValue) => {

        try {   
            
            if(inputValue?.length >= 3){
                
                const response = await userFetch.get("/lista-usuarios", {
                    params: {
                        inputValue
                    },
                });

                const data = response.data;

                const formatted = data.map(option => ({
                    value: option.IdUsuario, 
                    label: option.Nome, 
                }));
              
                setOptions(formatted);
            }

        } catch (error) {
            console.log('Erro ao obter a lista de usuários: ' + error)
        }
    }

    
    const getGrupo = async() => {
        try {

            if(!IdUpdate){
                console.log('Grupo não encontrada');
                return;
            }

            const response = await userFetch.get(`/grupo/${IdUpdate}`);

            setData(response.data);

            setSelected({
                label: response.data?.ResponsavelGrupo.Nome,
                value: response.data?.ResponsavelGrupo.IdGrupo
            })
            
            
        } catch (error) {
            console.log('Erro ao obter as informações de grupo: ' + error)
        }
    }
    
    useEffect(() => {
        getUsuario();
    }, [inputValue]);

    useEffect(() => {
        if (modalOpen && IdUpdate !== undefined) {
            getGrupo();
        }
    },[modalOpen, IdUpdate]);


    const handleChange = (selected) => {
        setSelected(selected);
    };


    const formRef = useRef();

    const updateGrupo = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            
            const dataToSend = { ...data, responsavel: selected?.value};

            const response = await userFetch.post("/grupo", dataToSend);

            if(response.status === 200){
                toast.success("Grupo criado com sucesso");

                closeAndRefresh();
                setLoading(false);
                formRef.current.reset();
                setSelected(null); // Resetar o Select
                setData({ nome: '', responsavel: null }); // Resetar o estado de data
                
                navigate('/grupos');
            }

        } catch (error) {
            setLoading(false);
            console.log('Erro ao cadastrar o grupo' + error);
        }
    }

    const deleteGrupo = async(e) => {
        e.preventDefault();

        try {
            const response = await userFetch.delete(`/delete/${IdUpdate}`);
            
            if(response.status === 200){
                closeAndRefresh();
                navigate('/despesas');
            }
            
        } catch (error) {
            console.log(`Erro: ` + error);
        }
    }

    return(
        <div className="pag-cadastro">
            <h1 className='title-page'>Editar Grupo</h1>
            
            <div className='form-cadastro'>
            
            <form ref={formRef}  onSubmit={updateGrupo}>
                <div className="form-row">

                    <div className="form-group col-md">
                        <label htmlFor="nome">Nome*</label>
                        <input type="text" required className="form-control" id="nome" name='nome' onChange={valueInput} value={data.Nome} />
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md">
                        <label htmlFor="responsavel">Responsável*</label>
                       <Select
                            value={selected}
                            onInputChange={(value) => {
                                setInputValue(value);
                                getUsuario(value);
                            }}
                            onChange={handleChange}
                            options={options}
                            isSearchable={true}
                            placeholder="Selecione uma opção..."
                            className="custom-pessoa"
                            noOptionsMessage={() => "Nenhuma opção encontrada"}
                            
                        />
                    </div>
                </div>


                  

                <BtnAddEdit loading={loading} />
            </form>

            </div>
        </div>
    );
}

export default GrupoEditar;