
const BtnAddEdit = ({isEdit, loading}) => {

    if(isEdit){
        return (
            <div className='div-buttons'>
                <button type="submit" className={loading ? 'btn btn-cadastrar button-loading' : 'btn btn-cadastrar'} disabled={loading}>{loading ? 'Salvando Aguarde...' : 'Salvar'}</button>
                <button onClick={(e) => DeleteClick(e, deleteApoiador)}  className="btn btn-excluir">Excluir</button>
            </div>
        )
    }else{
        return (
            <div className='div-buttons'>
                <button type="submit" className={loading ? 'btn btn-cadastrar button-loading' : 'btn btn-cadastrar'} disabled={loading}>{loading ? 'Salvando Aguarde...' : 'Salvar'}</button>
            </div>
        )
    }
}

export default BtnAddEdit;