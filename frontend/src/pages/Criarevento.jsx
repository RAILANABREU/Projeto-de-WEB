import Icon from "../components/common/icons";
import Main from "../components/layout/Main";
import Input from "../components/common/Input";
import Head from "../components/layout/Head";
import Button from "../components/common/Button";
import Footer from "../components/layout/Footer";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { criarEvento } from "../services/eventosServices";
import style from "./Criarevento.module.css";
import { useState } from "react";
import { createEventSchema } from "../Schemas/eventSchema";
import pako from 'pako';
import useAuth from "../useAuth";
import useImageUpload from "../useImage";

export default function CriarEvento(){
  useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        resolver: zodResolver(createEventSchema),
        mode: 'onChange',
    });
    const [message, setMessage] = useState(null);
    const navigate  = useNavigate();
    const { userId } = useParams();
    const { imagemBase64, handleImagemChange} = useImageUpload();
    const handleCancelar = () => {
        reset();
        navigate(`/home/${userId}`);
      };
    
    async function handleCriar(dadosEvento){
      const dados = { ...dadosEvento, admID: userId, imagem: imagemBase64};
      console.log(dados);
      if (isValid){
          try{
            const response = await criarEvento(dados, Cookies.get("token"));
            console.log(response)
    
            if (response.success){
              console.log("Evento Criado");
              navigate(`/home/${userId}`);
            }else{
              console.error(response.error)
              setMessage("Erro ao criar evento")
            }
            
            reset()
          }catch(error){
            console.error(error.message)
          }
          
        }else {
          console.log("não foi possivel enviar");
        }
    }   
    return(
        <div className="page">
            <Head onIconClick={handleCancelar}/>
            <div className="containerCentral">
            <Main>
                <h1>CRIAR EVENTO</h1>
                <input
                    className={style.uploadimg}
                    type="file"
                    accept="image/*"
                    id="uploadInput"
                    onChange={handleImagemChange}
                />
                <label htmlFor="uploadInput" className={style.uploadLabel}>
                <Icon 
                img={imagemBase64}
                type={"foto-evento"}/>
                </label>
                {message && (
                            <p style={{color: "red"}}>{message}</p>
                        )}
                <form onSubmit={handleSubmit(handleCriar)}>
                    <Input
                    id='título' 
                    name='titulo' 
                    type = 'text'
                    reg = {register}/>
                    {errors.titulo && (
                          <p className="error"><span>{errors.titulo.message}</span></p>
                        )}
                    <Input 
                    id= 'descrição' 
                    name= 'descricao' 
                    type= 'text'
                    reg = {register}/>
                    {errors.descricao && (
                          <p className="error"><span>{errors.descricao.message}</span></p>
                        )}
                    <Input 
                    id= 'chave pix' 
                    name= 'pix'
                    type= 'text'
                    reg = {register}/>
                    {errors.pix && (
                          <p className="error"><span>{errors.pix.message}</span></p>
                        )}
                    <Button 
                        type='cancelar/confirmar' 
                        name='CANCELAR' 
                        name2='CRIAR' 
                        onClickCancelar={handleCancelar}
                    />
                </form>
            </Main>
            </div>
            
            <Footer/>
        </div>
    )
}