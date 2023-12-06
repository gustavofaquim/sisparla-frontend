import * as React from 'react';
import { FaRegCircleXmark } from "react-icons/fa6";

const ModalListaContatos = (props) => {
    return(

        <div className="modal fade" id="ExemploModalCentralizado" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div class="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">X</button>
                    </div>

                    <div className="modal-body">
                        
                        <form>
                            <div className="form-group">
                                <label htmlFor="nome">Apelido da Lista</label>
                                <input type="nome" required className="form-control" id="apelido" name='apelido' placeholder="Apelido da Lista de Contatos" />
                            </div>

                            <div className="form-group">
                                {props.contatos.map(apoiador => (
                                    <div key={apoiador.IdApoiador} className="selected-apoiador">
                                        {apoiador.Nome}
                                        <FaRegCircleXmark class='btn-remove-apoiador' onClick={() => handleRemoveApoiador(apoiador.IdApoiador)} />
                                    </div>
                                ))}
                            </div>

                            <div className='btn'>
                                <button type="submit" class="btn btn-primary btn-cadastrar" >Salvar</button>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </div>
        )
}   

export default ModalListaContatos