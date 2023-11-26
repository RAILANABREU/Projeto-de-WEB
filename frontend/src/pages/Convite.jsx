import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import Icon from "../components/common/icons";
import style from "./Convite.module.css";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { conviteSchema } from "../Schemas/conviteSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { convidar } from "../services/eventosSevices";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Convite(){
    const {userId, eventoId} = useParams();
    const navigate  = useNavigate();
    const [message, setMessage] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        resolver: zodResolver(conviteSchema),
        mode: 'onChange',
    });

    async function handleEnviar(username) {
        const dados = { ...username, idAdm: userId, idEvento: eventoId };
    
        if (isValid) {
            try {
                const response = await convidar(dados, Cookies.get("token"));
                
    
                if (response.success) {
                    setMessage(response.data);
                    reset();
                } else {
                    setMessage(response.error);
                }
    
            } catch (error) {
                console.error(error.message);
                setMessage(error.message);
            }
    
        } else {
            console.log("não foi possível enviar");
        }
    }
    return(
        <div className="page">
            <Head onIconClick={() => navigate(`/home/${userId}`)}/>
            <Main>
                <form className={style.form} onSubmit={handleSubmit(handleEnviar)}>
                <div className="top">
                    <h1>CONVITE</h1>
                    <Icon type={"convite"}/>
                    <Input
                    id='nome de usuário do convidado' 
                    name='convidado' 
                    type = 'text'
                    reg = {register}/>
                    {errors.username && (
                          <p><span>{errors.username.message}</span></p>
                        )}
                    
                    {message && (
                            <p>{message}</p>
                        )}
                </div>
                 
                <Button 
                    type='cancelar/confirmar' 
                    name='CANCELAR' 
                    name2='ENVIAR'
                    onClickCancelar={() => navigate(`/home/${userId}`)}
                />
                </form>
            </Main>
        </div>
    )
}