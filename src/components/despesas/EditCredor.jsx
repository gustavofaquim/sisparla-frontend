import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { FaRegFloppyDisk } from "react-icons/fa6";

import consultaCEP from "../ConsultaCEP.jsx";
const CredirEdit = () =>{

    const params = useParams();
    const id = params?.id;

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const tipos =[
        {id: 1, descricao: 'Pessoa Física'},
        {id: 2, descricao: 'Pessoa Juridica'}
    ]


    const [cep, setCep] = useState('');
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
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


    const getCredor = async() => {
        try {

            if(id === undefined){
                console.log('Credor não encontrada');
                return;
            }
            
            const response = await userFetch(`/credor/${id}`);
           
            
            if(response.status == 200){
                
                setData(response.data.credor);

                const { Documento, Endereco, EnderecoPessoa, IdCredor, Nome, Telefone, Tipo } = response.data.credor;
                
                setCep(EnderecoPessoa.CEP)
                setCidade(EnderecoPessoa?.CidadeEndereco?.Nome);
                setEstado(EnderecoPessoa?.CidadeEndereco?.Estado);
                setBairro(EnderecoPessoa.Bairro);
                setComplemento(EnderecoPessoa.Complemento);
                setLogradouro(EnderecoPessoa.Lagradouro);
                setPontoReferencia(EnderecoPessoa.PontoReferencia);


            }else{
                console.log(error.response.data.msg);
            }

        } catch (error) {
            console.log('Erro ao buscar o credor' + error);
        }
    }

    const handleInputChangeCPF = (e) => {
        setCep(e.target.value);
    };

    const handleConsultaCEP = async () => {
        try {

            setEndereco(null);
        
            const resultadoConsulta  = await consultaCEP(cep);
            console.log('Entrou na consulta de CEP');
            console.log(resultadoConsulta);

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


    const updateCredor = async(e) => {
        e.preventDefault();

        try {
            
            const dataToSend = {...data, cep, estado, cidade,  bairro, logradouro, complemento, pontoReferencia};
            
            const response = await userFetch.put(`/credor/${id}`, dataToSend);

            if(response.status === 200){
                toast.success("Credor atualizado com sucesso");
                navigate('/lista-credores');
            }

        }catch (error) {
            console.log('Erro ao cadastrar o credor' + error);
        }

    }

    useEffect(() => {
        getEstados();
        getCredor();
    }, []);

    return(
        <div className="pag-cadastro">

            <h1 className='title-page'>Novo Credor</h1>
            <h2 className='subtitle-page'></h2> 

            <div className='form-cadastro'>
            
                <form  onSubmit={updateCredor}>

                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="nome">Nome*</label>
                        <input type="text" required className="form-control" id="nome" name='Nome' value={data.Nome} onChange={valueInput} />
                    </div>

                </div>

                
                <p className='form-session-title'>Endereço</p>
                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" className="form-control" id="cep" name="cep" value={cep}  onChange={handleInputChangeCPF}  onBlur={handleConsultaCEP}  />
                    </div>

                    <div className="form-group">
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

                    <div className="form-group col-md-5">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" className="form-control" id="cidade" name="cidade"  value={cidade}   onChange={(e) => setCidade(e.target.value)}  />
                    </div>
                    
                    
                    <div className="form-group">
                        <label htmlFor="endereco">Lagradouro</label>
                        <input type="text" className="form-control" id="endereco" name="endereco"  value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
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
                        <input type="text" className="form-control" id="ponto" name="ponto" value={pontoReferencia} onChange={(e) => setPontoReferencia(e.target.value)}  />
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group col-md-7">
                        <label htmlFor="telefone">Telefone*</label>
                        <input type="text" required className="form-control" id="telefone" name='Telefone' value={data.Telefone} onChange={valueInput} />
                    </div>

                </div>

              
                <div className="form-row">

                    <div className="form-group">
                            
                        <label htmlFor="tipo">Tipo*</label>
                        <select id="tipo" required className="form-control" name="Tipo" onChange={valueInput}>
                            <option selected={data.Top === null} disabled>Escolher...</option>
                            {
                                tipos.map((tipo) => (
                                    <option key={tipo.id} selected={data.Tipo === tipo.descricao}   value={tipo.descricao}> {tipo.descricao} </option>
                                ))
                            }
                        </select>

                    </div>

                    <div className="form-group col-md-7">
                        <label htmlFor="documento">CPF ou CNPJ*</label>
                        <input type="text" required className="form-control" id="documento" value={data.Documento} name='Documento' onChange={valueInput} />
                    </div>

                </div>


                <div className='btn'>
                    <button type="submit" className="btn btn-primary btn-cadastrar" >Atualizar Credor</button>
                </div>


                </form>
            
            </div>     

        </div>
    )
};

export default CredirEdit;