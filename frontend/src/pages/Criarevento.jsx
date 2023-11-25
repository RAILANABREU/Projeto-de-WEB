import Icon from "../components/common/icons";
import Main from "../components/layout/Main";
import Input from "../components/common/Input";
import Head from "../components/layout/Head";
import Button from "../components/common/Button";
import Footer from "../components/layout/Footer";
import { createEventSchema } from "../Schemas/createEventSchema";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { criarEvento } from "../services/eventosSevices";
import style from "./Criarevento.module.css";
import { useState } from "react";

export default function CriarEvento(){
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        resolver: zodResolver(createEventSchema),
        mode: 'onChange',
    });
    const navigate  = useNavigate();
    const { userId } = useParams();
    const [imagemBase64, setImagemBase64] = useState(null);
    const handleCancelar = () => {
        reset();
        navigate(`/home/${userId}`);
      };
    
    async function handleCriar(dadosEvento){
        const dados = { ...dadosEvento, adm: userId, imagem: imagemBase64};
        console.log(dados);
        if (isValid){
            try{
              const response = await criarEvento(dados, Cookies.get("token"));
              console.log(response)
      
              const {status, data} = response;
          
              if (status === 200){
                const {idevento} = data;
              }
              reset()
            }catch(error){
              console.error(error.message)
            }
            
          }else {
            console.log("não foi possivel enviar");
          }
        }   

    const handleImagemChange = (event) =>{
        const imagemArquivo = event.target.files[0];

        if (imagemArquivo) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagemBase64(reader.result);
        };

        reader.readAsDataURL(imagemArquivo);
        }else{
        setImagemBase64("");
        }
    }
    return(
        <div className="page">
            <Head onIconClick={handleCancelar}/>
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
                <form onSubmit={handleSubmit(handleCriar)}>
                    <Input
                    id='título' 
                    name='titulo' 
                    type = 'text'
                    reg = {register}/>
                    <Input 
                    id= 'descrição' 
                    name= 'descricao' 
                    type= 'text'
                    reg = {register}/>
                    <Input 
                    id= 'chave pix' 
                    name= 'pix'
                    type= 'text'
                    reg = {register}/>

                    <Button 
                        type='add'
                    />
                    <Button 
                        type='cancelar/confirmar' 
                        name='CANCELAR' 
                        name2='CRIAR' 
                        onClickCancelar={handleCancelar}
                    />
                </form>
            </Main>
            <Footer/>
        </div>
    )
}