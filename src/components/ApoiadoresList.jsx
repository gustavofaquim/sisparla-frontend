import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from "../axios/config.js";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaCirclePlus, FaMagnifyingGlass } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import { IoAddSharp } from "react-icons/io5";


import ApoiadoresNovo from "./ApoiadoresNovo.jsx";

import Pagination from './Pagination';
import InsereMascara from './InsereMascara.jsx';

import { Modal, closeAndRefresh } from "../components/modal/Modal.jsx";   
import ModalButton from "../components/modal/ModalButton.jsx";

import "../styles/components/apoiadores-list.sass";
import "../styles/components/filtro.sass";
import "../styles/components/tabela.sass";
import "../styles/components/modal.sass"




const ApoiadoresList = () => {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;


    
    const [apoiadores, setApoiadores] = useState([]);
    const [profissoes, setProfissoes] = useState([]);
    const [cidades, setCidades] = useState([]);
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


    const getPartidos = async() => {
        try {

            const response = await userFetch.get(`/partidos/`);
            const data = response.data;
            
            setPartidos(data);

        } catch (error) {
            console.log(`Erro ao recuperar a lista de partidos: ${error}`);
        }
    }

    const getFiltros = async() => {
        try {
            
            const response = await userFetch.get('/filtros/');
            const data = response.data;
            setCidades(data.cidades);
            setProfissoes(data.profissoes)

         
        } catch (error) {
            console.log(`Erro ao recuperar a lista de cidades: ${error}`);
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
        //getPartidos();
        getFiltros();
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


    const [modalOpen, setModalOpen] = useState(false);
    const [IdDemandaAtt, setIdDemandaAtt] = useState(null);


    const handleCloseAndRefresh = async () => {
        await closeAndRefresh(setModalOpen, setApoiadores, getApoiadores); // Certifique-se de passar a função getEventos conforme necessário
    };

    

    return(
        <div className="listagem-apoiadores">
            <h1 className='title-page'>Listagem de Apoiadores</h1>
            <h2 className='subtitle-page'>Lista de todos os eleitores ativos, desativos e com cadastro incompleto.</h2>

           
            <div id="accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <IoFilter /> Filtrar Informações
                        </button>
                    </h5>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                       

                    <div className='seletor-filtros'>
               
                        <div className='filtro'>
                            <div>
                                <p>Profissão</p>
                                    <select name="profissao" id="profissao" onChange={(e) => handleFiltroChange('profissao', e.target.value)}>
                                        <option value='todas'>Todas</option>
                                        {
                                            profissoes.map((profissao) => (   
                                                <option key={profissao.IdProfissao} value={profissao.IdProfissao}>{profissao.Nome}</option>
                                            ))
                                        }
                                    </select>
                            </div>
                        </div>

                        <div className='filtro'>
                            <p>Cidade</p>
                            <select name="cidade" id="cidade" onChange={(e) => handleFiltroChange('cidade', e.target.value)}>
                                <option value='todas'>Todas</option>
                                {
                                    cidades.map((cidade) => (
                                        <option key={cidade.IdCidade} value={cidade.IdCidade}>{cidade.Nome}</option>
                                    ))
                                }

                            </select>
                        </div>

                       

                            { /* <div className='filtro'>
                                <p>Partido</p>
                                <select name="partido" id="partido" onChange={(e) => handleFiltroChange('partido', e.target.value)}> 
                                    <option value='todos'>Todos</option>
                                    {
                                        partidos.map((partido) => (
                                            
                                            <option key={partido.IdPartido} value={partido.Nome}>{partido.Sigla}</option>
                                        ))
                                    }
                                    
                                </select>
                            </div> */ }

                            <div className='filtro'>
                                <p>Digite um termo para buscar</p>
                                <input type="text" id='busca' placeholder="" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                            
                            </div>

                        </div>
                    </div>

                    
                    </div>
                </div>
               
            </div>

             
            {/* Botão de Adição */}
            <ModalButton onClick={() => { setModalOpen(true); setIdDemandaAtt(null); }}>
                <IoAddSharp /> Novo Apoiador
            </ModalButton>

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

            {currentApoiadores.length === 0 ? <p className='aviso-sem-dados'>Sem apoiador para exibir.</p> : (
            <table>
                <thead>
                    <tr>
                    { /* <th>#</th>*/ }
                        <th>Nome</th>
                        <th className='ocultar-0 ocultar-4'>Telefone</th>
                        <th className='ocultar-0 ocultar-1'>E-mail</th>
                        <th className='ocultar-0 ocultar-2'>Cidade</th>
                        <th className='ocultar-0 ocultar-1'>Profissão</th>
                        <th className='ocultar-3'>Status</th>
                    </tr>
                </thead>

                <tbody>
             
                        {currentApoiadores.map((apoiador) => (
                            <tr key={apoiador.IdApoiador}>
                                { /* <td>
                                <input
                                    type="checkbox"
                                    onChange={() => handleSelecionarLinha(apoiador)}
                                    checked={linhasSelecionadas.some((linha) => linha.IdApoiador === apoiador.IdApoiador)}
                                    /> 
                                </td>*/ }
                                <td> <Link to={`/apoiador/${apoiador.IdApoiador}`}>{apoiador.Nome}</Link></td>
                                <td className='ocultar-0 ocultar-4'>
                                    <Link to={`https://api.whatsapp.com/send?phone=55${apoiador.TelefoneApoiador.Numero}`} target="_blank">
                                        <FaWhatsapp className='icon-whatsapp'/>
                                    </Link> 
                                    <InsereMascara className='ocultar-0' tipo='telefone' valor={apoiador?.TelefoneApoiador?.Numero} ></InsereMascara>
                                </td>


                                <td className='ocultar-0 ocultar-1' >{apoiador?.Email}</td> 
                                <td className='ocultar-0 ocultar-2'>{apoiador?.EnderecoApoiador?.CidadeEndereco?.Nome}</td> 
                                <td className='ocultar-0 ocultar-1'>{apoiador?.ProfissaoApoiador?.Nome}</td> 
                                <td className='ocultar-3'><span className={apoiador?.SituacaoCadastroApoiador?.Descricao?.toLowerCase()}>{apoiador?.SituacaoCadastroApoiador?.Descricao}</span></td>
                            </tr>
                        
                        ))}
                </tbody>
            </table>
            )}
             

            <Pagination totalItems={apoiadores} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />


            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={handleCloseAndRefresh}>
                <ApoiadoresNovo closeAndRefresh={handleCloseAndRefresh} />
            </Modal>
           

        </div>
    );

}

export default ApoiadoresList;