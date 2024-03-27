import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import userFetch from "./axios/config"; 

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaEyeSlash, FaEye  } from "react-icons/fa";


import "./styles/login.sass";


const Login = ({ onLogin }) => {
    
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginStatus = await onLogin(data);

        if (loginStatus) {
            // Login bem-sucedido, fazer algo
            navigate('/');
            //window.location.reload(); 
        } else {
            // Login falhou, fazer algo
            toast.error('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };
    
    const handleBlur = () => {
        setIsFocused(false);
    };
    
    //Receber os valores dos inputs
    const valueInput = (e) => setData({...data, [e.target.name] : e.target.value});

    return(
        <div className="login">
            <img className="logo-login" src='/logo.png' alt="logo" />
            
            <p>Faça login para acessar o sistema</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" required id="user" name='nomeUsuario' aria-describedby="user"  onChange={valueInput} placeholder="Usuário" />
                </div>
                <div className="form-group">
                    <div className={isFocused ? 'inputSenha inputSenhaClicado' : 'inputSenha inputSenhaNClicado'}>
                        <input type={showPassword ? 'text' : 'password'} className="form-control" required id="senha" name='senha' onChange={valueInput} onFocus={handleFocus} onBlur={handleBlur} placeholder="Senha" />
                        <span onClick={handleTogglePassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">ENTRAR</button>

                {/* <p> <a href="#">Problemas em acessar o sistema? Entre em contato</a></p>*/}
            </form>
        </div>
    )
}

export default Login;