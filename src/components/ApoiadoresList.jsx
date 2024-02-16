import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from "../axios/config.js";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaCirclePlus, FaMagnifyingGlass } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { IoAddSharp } from "react-icons/io5";

import Pagination from './Pagination';
import InsereMascara from './InsereMascara.jsx';


import "../styles/components/apoiadores-list.sass";


const ApoiadoresList = () => {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;


    
    const [apoiadores, setApoiadores] = useState([]);
    const [profissoes, setProfissoes] = useState([]);
    const [partidos, setPartidos] = useState([]);

    const [termoBusca, setTermoBusca] = useState(''); // Estado para o termo de busca
    const [filtros, setFiltros] = useState(''); // Estado para o termo de busca
    const [filtroProfissao, setFiltroProfissao] = useState('');
    const [filtroPartido, setFiltroPartido] = useState('');

    const [linhasSelecionadas, setLinhasSelecionadas] = useState([]);


    

    const chamaListaContato = () => {
        
        navigate('/lista-contatos', { state: { apoiadoresSelecionados: linhasSelecionadas } });
    }

    const chamaEnvioMensagem = () => {
        
        navigate('/nova-mensagem', { state: { apoiadoresSelecionados: linhasSelecionadas } });
    }

    const getProfissoes = async() => {

        try {
            const response = await userFetch.get("/profissoes");

            const data = response.data;
            
            setProfissoes(data);
            
        } catch (error) {
            console.log(`Erro ao recuperar a profissão: ${error}`);
        }
    }

    const getPartidos = async() => {
        try {

            const response = await userFetch.get(`/partidos/`);
            const data = response.data;
            
            setPartidos(data);

        } catch (error) {
            console.log(`Erro ao recuperar a lista de partidos: ${error}`);
        }
    }

    const handleFiltroChange = (filtroName, valor) => {
        setFiltros(prevFiltros => {
          const novosFiltros = { ...prevFiltros, [filtroName]: valor };
          return novosFiltros;
        });
    };


    const handleSelecionarLinha = (apoiador) => {
        setLinhasSelecionadas((prevLinhasSelecionadas) => {
          if (prevLinhasSelecionadas.some((linha) => linha.IdApoiador === apoiador.IdApoiador)) {
            // Remove a linha se já estiver selecionada
            return prevLinhasSelecionadas.filter((linha) => linha.IdApoiador !== apoiador.IdApoiador);
          } else {
            // Adiciona a linha se ainda não estiver selecionada
            return [...prevLinhasSelecionadas, apoiador];
          }
        });
    };
      


    const getApoiadores = async() => {


        try {

            const response = await userFetch.get("/apoiadores", {
                params: {
                    termoBusca, ...filtros,
                },
            });
            const data = response.data;
            setApoiadores(data);
           

        } catch (error) {
            console.log(`Ocorreu um erro ao buscar os apoiadores: ${error}`);
        }
    }


    useEffect(() => {
        getApoiadores();
        getProfissoes();
        getPartidos();
    }, []);


    
    useEffect(() => {
        if (termoBusca.length >= 3 || filtros != '') {
            getApoiadores();

        } else if(termoBusca === ''){
            getApoiadores();
        }
    }, [termoBusca, filtros]);


    const enviarMensagem = async() => {
       
        try {
            
            const response = await userFetch.post("/send", data);

        } catch (error) {
            console.log('Erro ao enviar a mensagem')
        }
    }

   

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentApoiadores = apoiadores.slice(indexOfFirstItem, indexOfLastItem);


    return(
        <div className="listagem-apoiadores">
            <h1 className='title-page'>Listagem de Apoiadores</h1>
            <h2 className='subtitle-page'>Lista de todos os eleitores ativos, desativos e com cadastro incompleto.</h2>

           
            <div id="accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            🔎 Filtrar Informações
                        </button>
                    </h5>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                       


                    <div className='seletor-filtros'>
               
                        <div className='filtro'>
                                <div>
                                    <p>Profissao</p>
                                        <select name="profissao" id="profissao" onChange={(e) => handleFiltroChange('profissao', e.target.value)}>
                                            <option value='todas'>Todas</option>
                                            {
                                                profissoes.map((profissao) => (   
                                                    <option key={profissao.IdProfissao} value={profissao.Nome}>{profissao.Nome}</option>
                                                ))
                                            }
                                        </select>
                                </div>
                            </div>

                            <div className='filtro'>
                                <p>Partido</p>
                                <select name="partido" id="partido" onChange={(e) => handleFiltroChange('partido', e.target.value)}> 
                                    <option value='todos'>Todos</option>
                                    {
                                        partidos.map((partido) => (
                                            
                                            <option key={partido.IdPartido} value={partido.Nome}>{partido.Sigla}</option>
                                        ))
                                    }
                                    
                                </select>
                            </div>

                            <div className='filtro'>
                                <p>Digite um termo para buscar</p>
                                <input type="text" id='busca' placeholder="Pesquise por nome, e-mail, telefone, cidade ou qualquer outro dado disponível." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                            
                            </div>

                        </div>
                    </div>

                    
                    </div>
                </div>
               
            </div>

             
            <div className='btn-add'>
                <Link to={"/novo-apoiador"}> <button><IoAddSharp /> Novo Apoiador</button></Link>
            </div>

            { /*
            <div className='btn-infos'>
                        
             
                <div className='links'>   
                    <a href="#" onClick={chamaListaContato}>Criar uma lista de contatos com base nos selecionados</a>
                    <a href="#" onClick={chamaEnvioMensagem}>Enviar Mensagem para os selecionados</a>

                </div> 
            

                <div className='quantidade-selecionados'>
                    {linhasSelecionadas.length} apoiador(es) selecionado(s)
                </div>
            </div>
            */ }
                        
            { /* <div className='novo-apoiador'>
                <Link to={`/novo-apoiador`}><FaCirclePlus /> Adicionar Novo Apoiador</Link>
            </div> */ }

            <table>
                <thead>
                    <tr>
                    { /* <th>#</th>*/ }
                        <th>Nome</th>
                        <th className='ocultar-0'>Telefone</th>
                        <th className='ocultar-0 ocultar-1'>E-mail</th>
                        <th className='ocultar-0 ocultar-2'>Cidade</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
            
                    {currentApoiadores.length === 0 ? <p>Carregando...</p> : (
                        currentApoiadores.map((apoiador) => (
                            <tr key={apoiador.IdApoiador}>
                                { /* <td>
                                <input
                                    type="checkbox"
                                    onChange={() => handleSelecionarLinha(apoiador)}
                                    checked={linhasSelecionadas.some((linha) => linha.IdApoiador === apoiador.IdApoiador)}
                                    /> 
                                </td>*/ }
                                <td> <Link to={`/apoiador/${apoiador.IdApoiador}`}>{apoiador.Nome}</Link></td>
                                <td>
                                    <Link to={`https://api.whatsapp.com/send?phone=55${apoiador.TelefoneApoiador.Numero}`} target="_blank">
                                        <FaWhatsapp className='icon-whatsapp'/>
                                    </Link> 
                                    <InsereMascara className='ocultar-0' tipo='telefone' valor={apoiador?.TelefoneApoiador?.Numero} ></InsereMascara>
                                </td>


                                <td className='ocultar-0 ocultar-1' >{apoiador?.Email}</td> 
                                <td className='ocultar-0 ocultar-2'>{apoiador?.EnderecoApoiador?.CidadeEndereco?.Nome}</td> 
                                <td className=''><span className={apoiador?.SituacaoCadastroApoiador?.Descricao.toLowerCase()}>{apoiador.SituacaoCadastroApoiador.Descricao}</span></td>
                            </tr>
                        
                        ))
                    )}
                </tbody>
            </table>

            <Pagination totalItems={apoiadores} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />

        </div>
    );

}

export default ApoiadoresList;