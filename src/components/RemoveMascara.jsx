const RemoveMascara = (campo) => {
   
    if(campo === undefined){
        return null;
    }
    // Remove qualquer caractere não numérico
    return campo.replace(/\D/g, '');
};

export default RemoveMascara;