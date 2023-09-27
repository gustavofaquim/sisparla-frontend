import * as React from 'react';

import "../styles/components/apoiador-novo.sass"

const ApoiadoresNovo = () => {
    
    return(

        <div className="cadastrar-apoiador">
           <h1 className='title-page'>Novo Apoiador</h1>
           <h2 className='subtitle-page'>Cadastre um novo apoiador.</h2>

            <div className='form-apoiador'>
                <form>

                <div class="form-row">

                    <div class="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
                    </div>

                    <div class="form-group col-md-6">
                        <label htmlFor="inputPassword4">Senha</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Senha" />
                    </div>
                </div>

                <div class="form-group">
                    <label htmlFor="inputAddress">Endereço</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="Rua dos Bobos, nº 0" />
                </div>

                <div class="form-group">
                    <label htmlFor="inputAddress2">Endereço 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartamento, hotel, casa, etc." />
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label htmlFor="inputCity">Cidade</label>
                        <input type="text" class="form-control" id="inputCity" />
                    </div>
                    <div class="form-group col-md-4">
                        <label htmlFor="inputEstado">Estado</label>
                        <select id="inputEstado" class="form-control">
                            <option selected>Escolher...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div class="form-group col-md-2">
                        <label htmlFor="inputCEP">CEP</label>
                        <input type="text" class="form-control" id="inputCEP" />
                    </div>
                </div>

                <button type="submit" class="btn btn-primary btn-cadastrar" >Cadastrar Apoiador</button>

                </form>
            </div>
        </div>
    )
}

export default ApoiadoresNovo;