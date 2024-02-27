import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from "react-router-dom";
import { FaRegFloppyDisk } from "react-icons/fa6";

import ConsultaCEP from "../ConsultaCEP.jsx";
import RemoveMascara from "../RemoveMascara.jsx";
import BtnAddEdit from "../btn/BtnAddEdit.jsx";

const CredorNovo = ({closeAndRefresh}) =>{

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

    const [loading, setLoading] = useState(false);
    

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

    const handleInputChangeCEP = (e) => {
        setCep(e.target.value);
    };

    const handleConsultaCEP = async () => {
        try {

            setEndereco(null);
        
            const resultadoConsulta  = await ConsultaCEP(cep);
            
            setCep(cep);

            setCidade(resultadoConsulta?.cidade || null);
            setBairro(resultadoConsulta.bairro || null);
            setLogradouro(resultadoConsulta.logradouro || null);
            
            if(resultadoConsulta.estado){
                
                const estadoEncontrado = estados.find(e => e.UF === resultadoConsulta.estado);
                const idEstado = estadoEncontrado ? estadoEncontrado.IdEstado : null;
                setEstado(idEstado || null);
            }
  
        } catch (error) {
            // Lidar com erros, se necessário
            console.error('Erro na consulta do CEP:', error);
        }
    };


    const createCredor = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            
            const cepSemMascara = RemoveMascara(cep);
            data.telefone = RemoveMascara(data.telefone);
            data.documento = RemoveMascara(data.documento);

        
            const dataToSend = {...data, cepSemMascara, estado, cidade,  bairro, logradouro, complemento, pontoReferencia};
            
            const response = await userFetch.post("/credor", dataToSend);

            if(response.status === 200){
                toast.success("Demanda criada com sucesso");

                closeAndRefresh();
                setLoading(false);
                
                navigate('/lista-credores');
            }

        } catch (error) {
            setLoading(false);
            console.log('Erro ao cadastrar o credor' + error);
        }

    }

    


    useEffect(() => {
        getEstados();
    }, []);

    return(
        <div className="pag-cadastro">

            <h1 className='title-page'>Novo Credor</h1>
            <h2 className='subtitle-page'>Pessoas ou empresas prestadoras de serviços, fornecedores de equipamentos etc.</h2> 

            <div className='form-cadastro'>
            
                <form  onSubmit={createCredor}>

                <div className="form-row">

                    <div className="form-group col-md">
                        <label htmlFor="nome">Nome*</label>
                        <input type="text" required className="form-control" id="nome" name='nome' onChange={valueInput} />
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group col-md-4">
                        <label htmlFor="telefone">Telefone*</label>
                        <InputMask required
                            id="telefone" name='telefone' onChange={valueInput}
                            mask="(99) 99999-9999"
                            maskChar="_"
                            className="form-control"  
                        />   
                    </div>

                </div>

                
                <p className='form-session-title'>Endereço</p>
                <div className="form-row">

                    <div className="form-group col-md-4">
                        <label htmlFor="cep">CEP</label>
                        <InputMask
                            className="form-control" id="cep" name="cep" 
                            mask="99999-999"
                            maskChar="_"
                            onChange={handleInputChangeCEP}  
                            onBlur={handleConsultaCEP}
                        />
                        
                    </div>

                    <div className="form-group col-md-2">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" className="form-control" name='estado' onChange={(e) => setEstado(e.target.value)}>
                            <option selected={estado === null}>Escolher...</option>
                            {
                                estados.map((uf) => (
                                    <option key={uf.IdEstado} selected={uf.IdEstado === estado}  value={uf.IdEstado} >{uf.UF}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group col-md">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" className="form-control" id="cidade" name="cidade"  value={cidade}   onChange={(e) => setCidade(e.target.value)}  />
                    </div>
                    
                </div>

                <div className="form-row">
                    <div className="form-group col-md">
                        <label htmlFor="endereco">Lagradouro</label>
                        <input type="text" className="form-control" id="endereco" name="endereco"  value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
                    </div>
                        
                    <div className="form-group col-md">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" className="form-control" id="bairro" name='bairro' value={bairro}  onChange={(e) => setBairro(e.target.value)}  />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md">
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" className="form-control" id="complemento" name='complemento' value={complemento}  onChange={(e) => setComplemento(e.target.value)}  />
                    </div>


                    <div className="form-group col-md">
                        <label htmlFor="complemento">Ponto Referencia</label>
                        <input type="text" className="form-control" id="ponto" name="ponto"  onChange={(e) => setPontoReferencia(e.target.value)}  />
                    </div>
                </div>

                   
                <div className="form-row">

                    <div className="form-group">
                            
                        <label htmlFor="tipo">Tipo*</label>
                        <select id="tipo" required className="form-control" name="tipo" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                tipos.map((tipo) => (
                                    <option key={tipo.id} value={tipo.descricao}> {tipo.descricao} </option>
                                ))
                            }
                        </select>

                    </div>

                    <div className="form-group col-md-7">
                        <label htmlFor="documento">{data.tipo === 'Pessoa Física' ? 'CPF' : 'CNPJ'}*</label>
                        <InputMask required
                            name="documento"
                            mask={data.tipo === 'Pessoa Física' ? '999.999.999-99' : '99.999.999/9999-99'}
                            maskChar="_"
                            className="form-control" id="documento" onChange={valueInput}
                            
                        />
                       
                    </div>


                </div>


                <BtnAddEdit loading={loading} />


                </form>
            
            </div>     

        </div>
    )
};

export default CredorNovo;