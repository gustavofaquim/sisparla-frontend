import userFetch from "../axios/config.js";

const ConsultaCEP = (cep) => {
 
  return userFetch.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      const { logradouro, localidade, uf, bairro } = response.data;

      return {
        cep,
        logradouro,
        cidade: localidade,
        bairro,
        estado: uf,
      };
    })
    .catch(error => {
      console.error('Erro ao buscar informações do CEP:', error);
      throw error;
    });
};
export default ConsultaCEP;

