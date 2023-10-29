import Main from "../components/layout/Main"
import Input from "../components/common/Input"
import Checkbox from "../components/common/Checkbox"
import Perfil from "../components/common/Perfil"

function SignUp(){
    return(
        <div className="page">
          <div className="head">
            <Perfil/>
          </div>
          <Main>
              <h1 style={{marginBottom: '50px'}}>CADASTRO</h1>
              <form>
                <Input id='nome de usuário' name='usuario' type = 'text'/>
                <Input id= 'email' name= 'email' type= 'email'/>
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