import Main from "../components/layout/Main"
import Logo from "../components/layout/Logo"
import Input from "../components/common/Input"
import Checkbox from "../components/common/Checkbox"

function SignIn(){
    return(
        <div className="page">
          <div className="head">
            <Logo/>
          </div>
          <Main>
              <h1 style={{marginBottom: '50px'}}>Sign In</h1>
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