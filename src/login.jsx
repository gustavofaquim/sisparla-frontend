
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


import "./styles/login.sass";
import userFetch from "./axios/config";

const Login = ({ onLogin }) => {
    
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginStatus = await onLogin(data);

        if (loginStatus) {
            // Login bem-sucedido, fazer algo
            console.log('Login bem-sucedidooo');
            navigate('/apoiadores');
        } else {
            // Login falhou, fazer algo
            console.log('Login falhouuuuuuu');
        }
    };
    
    //Receber os valores dos inputs
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});

    return(
        <div className="login">
            <h3>SisParla</h3>
            <h5>Faça login para acessar o sistema</h5>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <input type="text" class="form-control" id="user" name='nomeUsuario' aria-describedby="user"  onChange={valueInput} placeholder="Usuário" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="senha" name='senha' onChange={valueInput} placeholder="Senha" />
                </div>
                <button type="submit" class="btn btn-primary">ENTRAR</button>
            </form>

        </div>
    )
}

export default Login;