import userFetch from "../axios/config.js";

const consultaCEP = async(e) => {
    const cep = e.target.value;
    setCep(cep);

    if (cep.length === 8) {
       await userFetch.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            const { logradouro, localidade, uf, bairro } = response.data;
            setLagradouro(logradouro);
            setCidade(localidade);
            setBairro(bairro);
            setEstado(uf);
            
          })
          .catch(error => {
            console.error('Erro ao buscar informações do CEP:', error);
          });
    }

}

export default consultaCEP;

