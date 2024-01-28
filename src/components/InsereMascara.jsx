import React from 'react';

const FormataMascara = ({ tipo, valor }) => {
  const aplicarMascara = (valor, tipo) => {

    switch (tipo) {
      
      case 'telefone':
        return formatarTelefoneComMascara(valor);

      case 'cep':
        return formatarCEPComMascara(valor);
      
      case 'cpf':
        return formatarCPFComMascara(valor);
        
      case 'cnpj':
        return formatarCNPJComMascara(valor);
        
      
      default:
        return valor;
    }
  };

  const formatarTelefoneComMascara = (telefone) => {
    const parte1 = telefone.slice(0, 2);
    const parte2 = telefone.slice(2, 7);
    const parte3 = telefone.slice(7);
    return `(${parte1}) ${parte2}-${parte3}`;
  };

  const formatarCEPComMascara = (cep) => {
    const parte1 = cep.slice(0, 5);
    const parte2 = cep.slice(5);
    return `${parte1}-${parte2}`;
  };

  const formatarCPFComMascara = (cpf) => {
    const parte1 = cpf.slice(0, 3);
    const parte2 = cpf.slice(3, 6);
    const parte3 = cpf.slice(6, 9);
    const parte4 = cpf.slice(9);
    return `${parte1}.${parte2}.${parte3}-${parte4}`;
  };

  const formatarCNPJComMascara = (cnpj) => {
    const parte1 = cnpj.slice(0, 2);
    const parte2 = cnpj.slice(2, 5);
    const parte3 = cnpj.slice(5, 8);
    const parte4 = cnpj.slice(8, 12);
    const parte5 = cnpj.slice(12);
    return `${parte1}.${parte2}.${parte3}/${parte4}-${parte5}`;
  };

  return <span>{aplicarMascara(valor, tipo)}</span>;
};

export default FormataMascara;
