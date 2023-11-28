import { useForm } from 'react-hook-form';
import Input from '../components/common/Input'
import Logo from '../components/layout/Logo'
import Main from '../components/layout/Main'
import style from './Sign.module.css'
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/layout/Footer';
import { recuperarsenhaSchema } from '../Schemas/recuperarsenhaSchema';
import { recuperarSenha } from '../services/userServices';
import Button from '../components/common/Button';


export default function RecuperarSenha(){
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
      } = useForm({
        resolver: zodResolver(recuperarsenhaSchema),
        mode: 'onChange',
      });
      const navigate  = useNavigate();
      const [usuario, setUsuario] = useState(null);
      const [message, setMessage] = useState(null);

    const Submit = async (dados) =>{
        const data = {username: dados.username, secretWords:[dados.secretWords1, dados.secretWords2, dados.secretWords3, dados.secretWords4] }

        try{
            const response = await recuperarSenha(data)
            if(response.success){
                console.log(response)
            }else{
                setMessage(response.error)
            }
        }catch(error){
            console.error(error)
        }
    }

    return(
        <div className="page">
          <div className="main-container main-distance">
          <div className={style.head}>
            <Logo type= '3'/>
          </div>
          <Main>
              <h1>RECUPERAR SENHA</h1>
              {message && <p className="message">{message}</p>}
              <form onSubmit={handleSubmit(Submit)}>
                <Input 
                id= 'usuário'
                name= 'username'
                type= 'text'
                reg= {register}/>
                {errors.username && (
                          <p className="error"><span>{errors.username.message}</span></p>
                        )}

                <Input
                id= 'secretWord 1'
                name= 'secretWords1'
                type= 'text'
                reg= {register}/>
                {errors.secretWords1 && (
                          <p className="error"><span>{errors.secretWords1.message}</span></p>
                        )}
                <Input
                id= 'secretWord 2'
                name= 'secretWords2'
                type= 'text'
                reg= {register}/>
                {errors.secretWords2 && (
                          <p className="error"><span>{errors.secretWords2.message}</span></p>
                        )}
                <Input
                id= 'secretWord 3'
                name= 'secretWords3'
                type= 'text'
                reg= {register}/>
                {errors.secretWords3 && (
                          <p className="error"><span>{errors.secretWords3.message}</span></p>
                        )}
                <Input
                id= 'secretWord 4'
                name= 'secretWords4'
                type= 'text'
                reg= {register}/>
                {errors.secretWords4 && (
                          <p className="error"><span>{errors.secretWords4.message}</span></p>
                        )}

               
                <Button type="cancelar/confirmar" name="VOLTAR" name2="ENVIAR"
                onClickCancelar={()=>navigate(`/signin`)}/>
                
              </form>
          </Main>
          </div>
          
          <Footer/>  
        </div>
    )
}