import React from 'react';
import { Link } from "react-router-dom";

const ModalButton = ({ isLink, onClick, children }) => {
  if (isLink) {
    return (
      <Link href="#"  data-toggle="modal" data-target="#modal-pag" onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-pag" onClick={onClick}>
      {children}
    </button>
  );
};

export default ModalButton;
