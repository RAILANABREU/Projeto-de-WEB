import Main from "../components/layout/Main";
import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";
import Perfil from "../components/common/Perfil";
import style from "./Sign.module.css";
import Modal from "../components/common/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";

function SignUp(){
  const {register, handleSubmit, reset} = useForm();
  const [openModal, setOpenModal] = useState(true);
  //ao receber secretwords resposta do backend setOpenModal(true)
  //mostrar message em vermelho (mensagem de sucesso vai pro modal)
  function mostradados(data){
    console.log(data);
    reset();
  }
  return(
      <div className="page">
        <Modal isOpen={openModal} 
        setOpen={() => setOpenModal(!openModal)}>
          teste
        </Modal>
        <div className={style.head}>
          <Perfil/>
        </div>
        <Main>
            <h1>CADASTRO</h1>
            <form onSubmit={handleSubmit(mostradados)}>
              <Input 
              reg={register}
              className={style.nome}
              id='nome' name='nome' type = 'text'/>
              <Input 
              reg={register}
              className={style.nome}
              id='sobrenome' name='sobrenome' type = 'text'/>
              <Input 
              reg={register}
              id= 'usuário' name= 'username' type= 'text'/>
              <Input 
              reg={register}
              id= 'celular' name= 'celular' type= 'number'/>
              <Input 
              reg={register}
              id= 'senha' name= 'senha' type= 'password'/>
              <Input 
              reg={register}
              id= 'repita a senha' name= 'senha2' type= 'password'/>

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