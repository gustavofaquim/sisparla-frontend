import userFetch from "../../axios/config.js";

const convertCoordenadas = (address) => {
    
  return userFetch.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
    .then(response => {
      const {lat, lon} = response.data[0];
      

      return{
        latitude: lat,
        logitude: lon
      };      
    })
    .catch(error => {
      console.error('Erro ao converter endereço:', error);
      throw error;
  });       
};
  
export default convertCoordenadas;