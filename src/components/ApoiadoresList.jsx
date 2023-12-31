import * as React from 'react';
import { useState, useEffect } from "react";
import userFetch from "../axios/config.js";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaCirclePlus, FaMagnifyingGlass } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";



import "../styles/components/apoiadores-list.sass";


const ApoiadoresList = () => {

    const navigate = useNavigate();
    const [apoiadores, setApoiadores] = useState([]);
    const [profissoes, setProfissoes] = useState([]);
    const [partidos, setPartidos] = useState([]);

    const [termoBusca, setTermoBusca] = useState(''); // Estado para o termo de busca
    const [filtros, setFiltros] = useState({}); // Estado para o termo de busca
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
      


    useEffect(() => {
        getApoiadores();
    }, [termoBusca, filtros]);

    

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

    const enviarMensagem = async() => {
       
        try {
            
            const response = await userFetch.post("/send", data);

        } catch (error) {
            console.log('Erro ao enviar a mensagem')
        }
    }

   


    return(
        <div className="listagem-apoiadores">
            <h1 className='title-page'>Listagem de Apoiadores</h1>
            <h2 className='subtitle-page'>Lista de todos os eleitores ativos, desativos e com cadastro incompleto.</h2>

            <div className="filtro-busca">
                <div>
                   
                    <input type="text" placeholder="🔎 Digite um termo de busca" style={{ paddingLeft: '20px' }} value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                    
                </div>
            
            </div>

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
                        <th>#</th>
                        <th>Nome</th>
                        <th className='ocultar-0'>Telefone</th>
                        <th></th>
                        <th className='ocultar-0 ocultar-1'>E-mail</th>
                        <th className='ocultar-0 ocultar-2'>Cidade</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
            
                    {apoiadores.length === 0 ? <p>Carregando...</p> : (
                        apoiadores.map((apoiador) => (
                            <tr key={apoiador.IdApoiador}>
                                <td>
                                    <input
                                    type="checkbox"
                                    onChange={() => handleSelecionarLinha(apoiador)}
                                    checked={linhasSelecionadas.some((linha) => linha.IdApoiador === apoiador.IdApoiador)}
                                    />
                                </td>
                                <td> <Link to={`/apoiador/${apoiador.IdApoiador}`}>{apoiador.Nome}</Link></td>
                                <td className='ocultar-0'>{apoiador?.TelefoneApoiador?.Numero}</td>

                                {apoiador?.TelefoneApoiador?.Numero ? (
                                    <td>
                                        <Link to={`https://api.whatsapp.com/send?phone=55${apoiador.TelefoneApoiador.Numero}`} target="_blank">
                                        <FaWhatsapp/>
                                        </Link>
                                    </td>
                                ): <td><FaWhatsapp/></td>
                                }

                                <td className='ocultar-0 ocultar-1' >{apoiador?.Email}</td> 
                                <td className='ocultar-0 ocultar-2'>{apoiador?.EnderecoApoiador?.CidadeApoiador?.Nome}</td> 
                                <td className=''><span className={apoiador?.SituacaoCadastroApoiador?.Descricao.toLowerCase()}>{apoiador.SituacaoCadastroApoiador.Descricao}</span></td>
                            </tr>
                        
                        ))
                    )}
                </tbody>
            </table>
            
   
        </div>
    );

}

export default ApoiadoresList;