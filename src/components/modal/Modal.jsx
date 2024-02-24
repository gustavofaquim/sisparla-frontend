import React from 'react';

const closeAndRefresh = async (setModalOpen, setData, getDataFunction) => {
    
    setModalOpen(true);

  

    try {
      
      $('#modal-pag').modal('hide');
      // Chamar a função de obtenção dos dados atualizados
      const novosDados = await getDataFunction();

      if (novosDados) {
        // Atualizar o estado com os novos dados
        setData(novosDados); 
      }
    } catch (error) {
      console.error('Erro ao obter os dados atualizados:', error);
      
    }
};

const Modal = ({ isOpen, onClose, children }) => {
    
    return (
        <div id="modal-pag" className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" aria-hidden={!isOpen}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" onClick={onClose} aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
            </div>
            </div>
        </div>
        </div>
    );
};

export { Modal, closeAndRefresh };