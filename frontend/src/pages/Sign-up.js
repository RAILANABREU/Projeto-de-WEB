import Main from "../components/layout/Main"
import Input from "../components/common/Input"
import Checkbox from "../components/common/Checkbox"
import Perfil from "../components/common/Perfil"
import style from "./Sign.module.css"

function SignUp(){
  const [openModal, setOpenModal] = useState(false)
  //ao receber secretwords resposta do backend setOpenModal(true)
  //mostrar message em vermelho (mensagem de sucesso vai pro modal)
  return(
      <div className="page">
        <Modal isOpen={false}>teste</Modal>
          <div className={style.head}>
            <Perfil/>
          </div>
          <Main>
              <h1>CADASTRO</h1>
              <form>
                <Input className={style.nome}id='nome' name='nome' type = 'text'/>
                <Input className={style.nome}id='sobrenome' name='sobrenome' type = 'text'/>
                <Input id= 'usuário' name= 'username' type= 'text'/>
                <Input id= 'celular' name= 'celular' type= 'number'/>
                <Input id= 'senha' name= 'senha' type= 'password'/>
                <Input id= 'repita a senha' name= 'senha2' type= 'password'/>

                <div className="requisitos-senha"></div>

                <div className="checkbox-container">
                    <Checkbox text='Concordo com os termos de serviço'/>
                </div>
                <button type="submit">CRIAR CONTA</button>
                <p className={style.p}>Já tem uma conta?<a href="#">Entrar</a></p>
                
              </form>
          </Main>
        </div>
    )
}

export default SignUp