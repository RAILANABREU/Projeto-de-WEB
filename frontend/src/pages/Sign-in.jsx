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
import { Link, useNavigate } from 'react-router-dom';
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
  const [message, setMessage] = useState(null);

  async function onSubmit(credenciais) {
    if (isValid){
      try{
        const response = await signin(credenciais);
    
        if (response.success){
          const {id, token} = response.data;
          Cookies.set("token", token, { expires: 7});
          setUsuario(id);
          navigate(`/home/${id}`)
        }else{
          console.error("erro:", response.error)
          setMessage(response.error)
        }
        reset()
      }catch(error){
        setMessage(error.message)
        console.error(error.message)
      }
      
    }else {
      console.error("não foi possivel enviar");
    }
  }
    return(
        <div className="page">
          <div className="main-container main-distance">
          <div className={style.head}>
            <Logo type= '3'/>
          </div>
          <Main>
              <h1>ENTRAR</h1>
              {message && <p className="message">{message}</p>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                id= 'usuário'
                name= 'username'
                type= 'text'
                reg= {register}/>
                {errors.username && (
                          <p className="error"><span>{errors.username.message}</span></p>
                        )}

                <Input
                id= 'senha'
                name= 'senha'
                type= 'password'
                reg= {register}/>
                {errors.senha && (
                          <p className="error"><span>{errors.senha.message}</span></p>
                        )}
                <div className={style.column}>
                  <Link to = "/recuperarsenha">
                  Esqueci a senha
                  </Link>
                  <button type="submit">Entrar</button>
                </div>
                
                <p className={style.p}>Ainda não tem uma conta?<Link to="/signup">Criar conta</Link></p>
                
              </form>
          </Main>
          </div>
          
          <Footer/>  
        </div>
    )
}

export default SignIn