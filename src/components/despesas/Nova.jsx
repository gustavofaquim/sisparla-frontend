import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { toast } from 'react-toastify';

import { useNavigate, useParams } from "react-router-dom";

import { FaRegFloppyDisk } from "react-icons/fa6";

const Nova = () => {

    const params = useParams();
    const id = params?.id;

    const navigate = useNavigate();

    const [origens, setOrigens] =  useState([]);
    const [tipos, setTipos] = useState([]);
  

    const [data, setData] = useState([]);

    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});

    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [dataAtual, setDataAtual] = useState(getFormattedDate());


    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const getDespesa = async() => {

        try {

            if(id === undefined){
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
                        console.log("API não respondeu");
                    }
                })

        } catch (error) {
            console.log('Erro ao buscar a despesa')
        }
    }

    const getOrigem = async() => {
        try {
            
            const response = await userFetch.get('/origens-despesas');
            const data = response.data;
            setOrigens(data);

        } catch (error) {
            console.log('Erro ao listar as origens');
        }
    }

    const getTipo = async() => {
        try {
            
            const response = await userFetch.get("/tipos-despesas");
            const data = response.data;
            setTipos(data);

        } catch (error) {
            console.log('Erro ao listar os tipos');
            toast.error("Houve um erro listar os tipos");
        }
    }


    const getPessoaDespesa = async(inputValue) => {
        

        try {
            
            if(inputValue?.length >= 4){
                const response = await userFetch.get("/credores", {
                    params: {
                        inputValue
                    },
                });

                const data = response.data;
                
                const formattedOptions = data.map(option => ({
                    value: option.IdCredor, 
                    label: option.Nome, 
                }));

                setOptions(formattedOptions);
                
            }else{
                
                setOptions([]);
            }
            
        } catch (error) {
            console.log(`Erro ao listar as pessoas: ` + error);
        }
    }


    useEffect(() => {
        getOrigem();
        getTipo();
        getPessoaDespesa();
        getDespesa();
    },[inputValue]);

    const createDespesa = async(e) => {
        e.preventDefault();

        try {
            
            const dataToSend = { ...data, Credor: selectedOption.value, dataDespesa: dataAtual };
            
            console.log(dataToSend)
            
            const response = await userFetch.post("/despesa", dataToSend);
            
            if(response.status == '200'){
                toast.success("Despesa criada com sucesso");
                navigate('/despesas');
            }
            

        } catch (error) {
            toast.error("Houve um erro ao criar a despesa");
            console.log('Erro ao cadastrar a despesa:' + error);
        }
    }


    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleDateChange = (event) => {
        setDataAtual(event.target.value);
    };

    return(
        <div className="pag-cadastro">
             <h1 className='title-page'>Nova Despesa</h1>
             <h2 className='subtitle-page'>Cadastre uma nova despesa.</h2>

             <div className='form-cadastro'>

                <form  onSubmit={createDespesa}>

                <p className='form-session-title'></p>
                
                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="descricao">Descrição*</label>
                        <input type="descricao" required className="form-control" id="descricao" name='descricao' onChange={valueInput} />
                    </div>

                </div>

                <div className="form-row">
                    <label htmlFor="detalhamento">Detalhamento</label>
                    <textarea name="detalhamento" id="detalhamento" onChange={valueInput}></textarea>
                </div>

                <div className="form-row">
                   
                    <div className="form-group">
                        <label htmlFor="valor">Valor*</label>
                        
                        <input type="number" name="valor" className="form-control" id="valor" onChange={valueInput} />
                    </div>
                </div>

                <div className="form-row">
                    
                    <div className="form-group  col-md-5">
                        <label htmlFor="valor">Credor*</label>
                        <Select
                            value={selectedOption}
                            onInputChange={(value) => {
                                setInputValue(value);
                                getPessoaDespesa(value);
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

                <div className="form-row">

                    <div className="form-group">
                        
                        <label htmlFor="categoria">Origem*</label>
                        <select id="origem" required className="form-control" name="idOrigem" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                origens.map((ori) => (
                                    <option key={ori.IdOrigem} value={ori.IdOrigem}> {ori.Descricao} </option>
                                ))
                            }
                        </select>

                    </div>

                    <div className="form-group">
                        
                        <label htmlFor="categoria">Tipos*</label>
                        <select id="tipo" required className="form-control" name="idTipo" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                tipos.map((tip) => (
                                    <option key={tip.IdTipo} value={tip.IdTipo}> {tip.Descricao} </option>
                                ))
                            }
                        </select>

                    </div>

                    <div className="form-group">
                        <label htmlFor="data">Data</label>
                        <input type="date" required id='dataDespesa' className="form-control" name='dataDespesa' onChange={handleDateChange} value={dataAtual} />
                    </div>

                </div>

    
                <div className='btn'>
                    <button type="submit" className="btn btn-primary btn-cadastrar"> {<FaRegFloppyDisk />} Cadastrar Despesa</button>
                </div>
                

                </form>

             </div>
        </div>
    )
}

export default Nova;