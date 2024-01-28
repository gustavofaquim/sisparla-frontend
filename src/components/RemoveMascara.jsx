const RemoveMascara = (campo) => {
    // Remove qualquer caractere não numérico
    return campo.replace(/\D/g, '');
};

export default RemoveMascara;