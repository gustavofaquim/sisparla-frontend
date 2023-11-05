import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";



import { FaRegFloppyDisk } from "react-icons/fa6";

import "../../styles/components/nova-demanda.sass";

const Nova = () => {

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]); 
    const [responsaveis, setResponsaveis] = useState([]);
    const [situacoes, setSituacoes] = useState([]); 
    const [emendaParlamentar, setEmendaParlamentar] = useState([]); 
    
    const [data, setData] = useState([]);

    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});

    const getCategorias = async() => {
        try {
            
            const response = await userFetch('/categorias-demandas');
            const data = response.data;
            setCategorias(data);

        } catch (error) {
            console.log('Erro ao recuperar as categorias de demandas');
        }
    }

    const getSituacoes = async() => {
        try {
            
            const response = await userFetch('/situacao-demandas');
            const data = response.data;
            setSituacoes(data);

        } catch (error) {
            console.log('Erro ao recuperar as situações de demandas');
        }
    }

    const getUsers = async() => {
        try {
            const response = await userFetch("/lista-usuarios");
            const data = response.data;
            setResponsaveis(data);
        } catch (error) {
            console.log('Erro ao recuperar os usuários');
        }
    }

    useEffect(() => {
        getCategorias();
        getSituacoes();
        getUsers();
    },[]);


    const createDemanda = async(e) => {
        e.preventDefault();

        try {
            
            const response = await userFetch.post("/demandas", data);
            console.log(response);

            if(response.status == '200'){
                navigate('/');
            }
            

        } catch (error) {
            console.log('Erro ao cadastrar a demanda:' + error);
        }
    }


    return(
        <div className="cadastar-demanda">
             <h1 className='title-page'>Nova Demanda</h1>
             <h2 className='subtitle-page'>Cadastre uma nova demanda.</h2>


             <div className='form-demanda'>

                <form  onSubmit={createDemanda}>

                <p className='form-session-title'></p>
                
                <div class="form-row">

                    <div class="form-group col-md-7">
                        <label htmlFor="assunto">Assunto</label>
                        <input type="assunto" required class="form-control" id="assunto" name='assunto' placeholder="Assunto"  onChange={valueInput} />
                    </div>

                </div>

                <div class="form-row">

                    
                    <div class="form-group col-md-7">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea name='descricao' onChange={valueInput} id="descricao"></textarea>
                    </div>

                    
                </div>

                <div class="form-row">


                    <div class="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" required class="form-control" name="idCategoria" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                categorias.map((cat) => (
                                    <option key={cat.IdCategoria} value={cat.IdCategoria}> {cat.Descricao} </option>
                                ))
                            }
                        </select>

                     
                    </div>


                    <div class="form-group">
                        <label htmlFor="situacao">Situação</label>
                        <select id="situacao" required class="form-control" name="idSituacao" onChange={valueInput}>
                            <option selected value="" disabled>Escolher...</option>
                            {
                                situacoes.map((sit) => (
                                    <option key={sit.IdSituacao} value={sit.IdSituacao}> {sit.Descricao} </option>
                                ))
                            }
                        </select>
                    </div>

                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label htmlFor="responsavel">Responsável</label>
                        <select id="responsavel" class="form-control" name="idResponsavel" onChange={valueInput}>
                            <option selected>Escolher...</option>
                            {
                                responsaveis.map((resp) => (
                                    <option key={resp.IdUsuario} value={resp.IdUsuario}> {resp.Nome} </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    
                    <div class="form-group">
                        <p>Emanda Parlamentar ?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarS" value="sim" onChange={(e) => setEmendaParlamentar(e.target.value)} />
                            <label class="form-check-label" for="emendaParlamentarS">Sim</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="emendaParlamentar" id="emendaParlamentarN" value="nao" onChange={(e) => setEmendaParlamentar(e.target.value)} />
                            <label class="form-check-label" for="emendaParlamentarN">Não</label>
                        </div>
                    </div>

                    
                    <div class="form-group">
                        <label htmlFor="valor">Valor Estimado</label>
                        <input type="number" name="valor" id="vaor" />
                    </div>

                </div>

                <div className='btn'>
                    <button type="submit" class="btn btn-primary btn-cadastrar"> {<FaRegFloppyDisk />} Cadastrar Demanda</button>
                </div>
                


                </form>

             </div>
        </div>
    )
}

export default Nova;