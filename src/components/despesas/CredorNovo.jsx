import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { FaRegFloppyDisk } from "react-icons/fa6";

import consultaCEP from "../ConsultaCEP.jsx";
const CredorNovo = () =>{

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const tipos =[
        {id: 1, descricao: 'Pessoa Física'},
        {id: 2, descricao: 'Pessoa Juridica'}
    ]

    const [estados, setEstados] = useState([]);
    const [estado, setEstado] = useState();

    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});


    const getEstados = async() => {
        try {
            const response = await userFetch.get("/estados");
            const data = response.data;
            setEstados(data);
        } catch (error) {
            console.log(`Erro ao recuperar a lista de estados: ${error}`);
        }
    }




    const createCredor = async(e) => {
        e.preventDefault();

    }

    useEffect(() => {
        getEstados();
    }, []);

    return(
        <div className="pag-cadastro">

            <h1 className='title-page'>Novo Credor</h1>
            <h2 className='subtitle-page'></h2> 

            <div className='form-cadastro'>
            
                <form  onSubmit={createCredor}>

                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="nome">Nome*</label>
                        <input type="text" required className="form-control" id="nome" name='nome' onChange={valueInput} />
                    </div>

                </div>

                
                <p className='form-session-title'>Endereço</p>
                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" className="form-control" id="cep" name="cep"  onChange={consultaCEP}  />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" className="form-control" name='estado'  onChange={(e) => setEstado(e.target.value)} >
                            <option selected>Escolher...</option>
                            {
                                estados.map((estado) => (
                                    <option key={estado.IdEstado} value={estado.IdEstado}>{estado.UF}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group col-md-5">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" className="form-control" id="cidade"   onChange={(e) => setCidade(e.target.value)}  />
                    </div>
                    
                    

                    <div className="form-group">
                        <label htmlFor="endereco">Lagradouro</label>
                        <input type="text" className="form-control" id="endereco"  onChange={(e) => setLagradouro(e.target.value)}  />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" className="form-control" id="bairro"  onChange={(e) => setBairro(e.target.value)}  />
                    </div>


                    <div className="form-group">
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" className="form-control" id="complmento"  onChange={(e) => setComplemento(e.target.value)}  />
                    </div>


                    <div className="form-group">
                        <label htmlFor="complemento">Ponto Referencia</label>
                        <input type="text" className="form-control" id="complemento"  onChange={(e) => setPontoReferencia(e.target.value)}  />
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="telefone">Telefone*</label>
                        <input type="text" required className="form-control" id="telefone" name='telefone' onChange={valueInput} />
                    </div>

                </div>

              
                <div className="form-row">

                    <div className="form-group">
                            
                        <label htmlFor="tipo">Tipo*</label>
                        <select id="tipo" required className="form-control" name="idTipo" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                tipos.map((tipo) => (
                                    <option key={tipo.id} value={tipo.descricao}> {tipo.descricao} </option>
                                ))
                            }
                        </select>

                    </div>

                    <div className="form-group col-md-7">
                        <label htmlFor="documento">CPF ou CNPJ*</label>
                        <input type="text" required className="form-control" id="documento" name='documento' onChange={valueInput} />
                    </div>



                </div>


                <div className='btn'>
                    <button type="submit" className="btn btn-primary btn-cadastrar" >Cadastrar Credor</button>
                </div>


                </form>
            
            </div>     

        </div>
    )
};

export default CredorNovo;