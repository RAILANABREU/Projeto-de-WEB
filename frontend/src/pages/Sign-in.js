import Main from "../components/layout/Main"
import Logo from "../components/layout/Logo"
import Input from "../components/common/Input"
import Checkbox from "../components/common/Checkbox"
import style from "./Sign.module.css"

function SignIn(){
    return(
        <div className="page">
          <div className={style.head}>
            <Logo type= '2'/>
          </div>
          <Main>
              <h1>ENTRAR</h1>
              <form>
                <Input id= 'email' name= 'email' type= 'email'/>
                <Input id= 'senha' name= 'senha' type= 'password'/>
                <div className='checkbox-container'>
                  <Checkbox text='Manter conectado'/>
                  <a href="#">Esqueci a senha</a>
                </div>
                <button type="submit">Entrar</button>
                <p>Ainda não tem uma conta?<a href="#">Criar conta</a></p>
                
              </form>
          </Main>
        </div>
    )
}

export default SignIn