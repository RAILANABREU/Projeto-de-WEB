import Main from "../components/layout/Main"
import Footer from "../components/layout/Footer"
import Logo from "../components/layout/Logo"
import Input from "../components/common/Input"
import Checkbox from "../components/common/Checkbox"
import style from "./Sign.module.css"
import { useForm } from "react-hook-form";
import { signinSchema } from "../Schemas/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin } from "../services/userServices"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function SignIn(){
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  });
  const navigate  = useNavigate();
  const [usuario, setUsuario] = useState(null);

  async function onSubmit(credenciais) {
    if (isValid){
      const response = await signin(credenciais);
      console.log(response)

      const {status, data} = response;
  
      if (status === 200){
        const {id, token} = data;
        Cookies.set("token", token, { expires: 1});
        setUsuario(id);
        navigate(`/home/${id}`)
      }
    }else {
      console.log("não foi possivel enviar");
    }
  }
    return(
        <div className="page">
          <div className={style.head}>
            <Logo type= '2'/>
          </div>
          <Main>
              <h1>ENTRAR</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                id= 'usuário'
                name= 'username'
                type= 'text'
                reg= {register}/>
                {errors.username && (
                          <p><span>{errors.username.message}</span></p>
                        )}

                <Input
                id= 'senha'
                name= 'senha'
                type= 'password'
                reg= {register}/>
                {errors.senha && (
                          <p><span>{errors.senha.message}</span></p>
                        )}

                <div className='checkbox-container'>
                  <Checkbox text='Manter conectado'/>
                  <a href="#">Esqueci a senha</a>
                </div>
                <button
                type="submit"
                disabled={isValid === false}>
                Entrar</button>
                <p className={style.p}>Ainda não tem uma conta?<a href="#">Criar conta</a></p>
                
              </form>
          </Main>
          <Footer/>  
        </div>
    )
}

export default SignIn