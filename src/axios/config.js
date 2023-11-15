import axios from "axios";

const userFetch = axios.create({
   baseURL: "http://localhost:3000/api/", 
   headers: {
    "Content-Type": "application/json"
   }
});

// Adicione o interceptor para incluir o token em todas as requisições
userFetch.interceptors.request.use((config) => {
   const token = localStorage.getItem('token');
 
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }

  

 
  return config;
 });

export default userFetch;