import userFetch from "../../axios/config.js";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";


import { FaRegFloppyDisk } from "react-icons/fa6";

import "../../styles/components/nova-demanda.sass";

const Nova = () => {

    const navigate = useNavigate();
    const [assunto, setAssunto] = useState([]);
    const [descricao, setDescricao] = useState([]);
    const [categoria, setCategoria] = useState([]); 
    const [responsavel, setResponsavel] = useState([]);
    const [situacao, setSituacao] = useState([]); 
    const [emendaParlamentar, setEmendaParlamentar] = useState([]); 
    

    return(
        <div className="cadastar-demanda">
             <h1 className='title-page'>Nova Demanda</h1>
             <h2 className='subtitle-page'>Cadastre uma nova demanda.</h2>


             <div className='form-demanda'>

                <form >

                <p className='form-session-title'></p>
                
                <div class="form-row">

                    <div class="form-group col-md-7">
                        <label htmlFor="assunto">Assunto</label>
                        <input type="assunto" class="form-control" id="assunto" name='nome' placeholder="Assunto" value={assunto|| ''} onChange={(e) => setAssunto(e.target.value)} />
                    </div>

                </div>

                <div class="form-row">

                    
                    <div class="form-group col-md-7">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea name="descricao" id="descricao"></textarea>
                    </div>

                    
                </div>

                <div class="form-row">


                    <div class="form-group">
                        <label htmlFor="inputEstado">Categoria</label>
                        <select id="categoria" class="form-control" value={categoria|| ''} onChange={(e) => setCategoria(e.target.value)}>
                            <option selected>Escolher...</option>
                        </select>
                    </div>


                    <div class="form-group">
                        <label htmlFor="inputEstado">Situação</label>
                        <select id="categoria" class="form-control" value={situacao|| ''} onChange={(e) => setSituacao(e.target.value)}>
                            <option selected>Escolher...</option>
                        </select>
                    </div>

                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label htmlFor="inputEstado">Responsável</label>
                        <select id="categoria" class="form-control" value={responsavel|| ''} onChange={(e) => setResponsavel(e.target.value)}>
                            <option selected>Escolher...</option>
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