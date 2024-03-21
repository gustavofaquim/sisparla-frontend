import axios from "axios";

const userFetch = axios.create({
   baseURL: "http://62.72.63.93:3000/api/", 
   //baseURL: "http://localhost:3000/api/", 
   headers: {
    "Content-Type": "application/json"
   }
});

// Adicione o interceptor para incluir o token em todas as requisições
userFetch.interceptors.request.use((config) => {
   const token = sessionStorage.getItem('token');
   
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }

 
  return config;
});

export default userFetch;