
import { useState } from "react";
import "./styles/login.sass";
import userFetch from "./axios/config";

const Login = ({ onLogin }) => {

    const [data, setData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        
    
        onLogin(data);
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