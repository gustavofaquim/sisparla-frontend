
import "./styles/login.sass";

const Login = () => {

    return(
        <div className="login">
            <h3>SisParla</h3>
            <h5>Faça login para acessar o sistema</h5>
            <form>
                <div class="form-group">
                    <input type="text" class="form-control" id="user" aria-describedby="user" placeholder="Usuário" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="senha" placeholder="Senha" />
                </div>
                <button type="submit" class="btn btn-primary">ENTRAR</button>
            </form>

        </div>
    )
}

export default Login;