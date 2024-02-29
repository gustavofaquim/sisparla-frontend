import React from 'react';
import { Link } from "react-router-dom";

const ModalButton = ({ isLink, isBtnEdit, onClick, children }) => {
  if (isLink) {
    return (
      <Link href="#"  data-toggle="modal" data-target="#modal-pag" onClick={onClick}>
        {children}
      </Link>
    );
  }

  else if(isBtnEdit){
    return (
      <button type="button" className="btn btn-editar" data-toggle="modal" data-target="#modal-pag" onClick={onClick}>
        {children}
      </button>
    );
  }
  
  return (
    <button type="button" className="btn btn-primary btn-add" data-toggle="modal" data-target="#modal-pag" onClick={onClick}>
      {children}
    </button>
  );
};

export default ModalButton;
