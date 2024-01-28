import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import '../styles/components/deleteClick.sass';

const DeleteClick = (e, funcaoDelete) => {
    e.preventDefault();
    
    const customUI = ({ onClose }) => (
      <div className="custom-alert">
        <p>Confirmação</p>
        <h3>Tem certeza que deseja excluir?</h3>
        <button onClick={() => { onClose(); }}>Não</button>
        <button onClick={() => { funcaoDelete(e); onClose(); }}>Sim</button>
      </div>
    );
    
    confirmAlert({
      customUI,
      title: 'Confirmação',
      message: 'Tem certeza que deseja excluir?',
    });
};

export default DeleteClick;