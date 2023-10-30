import Main from "../components/layout/Main"
import Input from "../components/common/Input"
import Checkbox from "../components/common/Checkbox"
import Perfil from "../components/common/Perfil"
import style from "./Sign.module.css"

function SignUp(){
    return(
        <div className="page">
          <div className={style.head}>
            <Perfil/>
          </div>
          <Main>
              <h1>CADASTRO</h1>
              <form>
                <Input className={style.nome}id='nome' name='nome' type = 'text'/>
                <Input className={style.nome}id='sobrenome' name='sobrenome' type = 'text'/>
                <Input id= 'email' name= 'email' type= 'email'/>
                <Input id= 'celular' name= 'celular' type= 'number'/>
                <Input id= 'senha' name= 'senha' type= 'password'/>
                <Input id= 'repita a senha' name= 'senha2' type= 'password'/>
                <div className="checkbox-container">
                    <Checkbox text='Concordo com os termos de serviço'/>
                </div>
                <button type="submit">CRIAR CONTA</button>
                <p>Já tem uma conta?<a href="#">Entrar</a></p>
                
              </form>
          </Main>
        </div>
    )
}

export default SignUp