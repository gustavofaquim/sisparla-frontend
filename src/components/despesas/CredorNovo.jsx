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

    const [cep, setCep] = useState('');
    const [estados, setEstados] = useState([]);
    const [estado, setEstado] = useState('');
    const [endereco, setEndereco] = useState(null);
    const [cidade, setCidade] = useState(null);
    const [logradouro, setLogradouro] = useState(null);
    const [bairro, setBairro] = useState(null);
    const [complemento, setComplemento] = useState(null);
    const [pontoReferencia, setPontoReferencia] = useState(null);
    

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

    const handleInputChangeCPF = (e) => {
        setCep(e.target.value);
    };

    const handleConsultaCEP = async () => {
        try {

            setEndereco(null);
        
            const resultadoConsulta  = await consultaCEP(cep);
            
            setEstado(resultadoConsulta.estado || null);
            setCidade(resultadoConsulta?.cidade || null);
            setBairro(resultadoConsulta.bairro || null);
            setLogradouro(resultadoConsulta.logradouro || null);
            

  
        } catch (error) {
            // Lidar com erros, se necessário
            console.error('Erro na consulta do CEP:', error);
        }
    };


    const createCredor = async(e) => {
        e.preventDefault();

        try {
            
            const dataToSend = {...data, estado, cidade,  bairro, logradouro, complemento, pontoReferencia};
            
            const response = await userFetch.post("/credor", dataToSend);

            if(response.status === '200'){
                toast.success("Demanda criada com sucesso");
                navigate('/lista-credores');
            }

        } catch (error) {
            console.log('Erro ao cadastrar o credor' + error);
        }

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
                        <input type="text" className="form-control" id="cep" name="cep"  onChange={handleInputChangeCPF}  onBlur={handleConsultaCEP}  />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" className="form-control" name='estado' onChange={(e) => setData(e.target.value)} >
                            <option selected={estado === null}>Escolher...</option>
                            <option >Teste</option>
                            {
                                estados.map((uf) => (
                                    <option key={uf.IdEstado} selected={uf.UF === estado}  value={uf.IdEstado}>{uf.UF}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group col-md-5">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" className="form-control" id="cidade" name="cidade"  value={cidade}   onChange={(e) => setCidade(e.target.value)}  />
                    </div>
                    
                    
                    <div className="form-group">
                        <label htmlFor="endereco">Lagradouro</label>
                        <input type="text" className="form-control" id="endereco" name="endereco"  value={logradouro} onChange={(e) => setLagradouro(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" className="form-control" id="bairro" name='bairro' value={bairro}  onChange={(e) => setBairro(e.target.value)}  />
                    </div>


                    <div className="form-group">
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" className="form-control" id="complemento" name='complemento' value={complemento}  onChange={(e) => setComplemento(e.target.value)}  />
                    </div>


                    <div className="form-group">
                        <label htmlFor="complemento">Ponto Referencia</label>
                        <input type="text" className="form-control" id="ponto" name="ponto"  onChange={(e) => setPontoReferencia(e.target.value)}  />
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