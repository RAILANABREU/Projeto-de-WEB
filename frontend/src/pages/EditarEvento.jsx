import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, editEventSchema } from "../Schemas/eventSchema";
import { editarEvento } from "../services/eventosSevices";
import Cookies from "js-cookie";
import style from "./EditarEvento.module.css";
import Icon from "../components/common/icons";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import pako from 'pako';
import useAuth from "../useAuth";
import useImageUpload from "../useImage";

export default function EditarEvento() {
  useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { imagemBase64, handleImagemChange} = useImageUpload();
  const [message, setMessage] = useState(null);
  const [eventData, setEventData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(editEventSchema),
    mode: "onChange",
  });

  const handleCancelar = () => {
    reset();
    navigate(`/home/${userId}`);
  };

  const handleSave = async (data) => {
    if (isValid) {
      const dadosNaoVazios = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value !== null && value !== "" ? value : eventData[key],
        ])
      );
    
      const dataComImagem = { ...dadosNaoVazios, avatar: imagemBase64, _id: userId };
  
      console.log(dataComImagem);
  
      try {
        const response = await editarEvento(dataComImagem, Cookies.get("token"));
        console.log(response);
  
        if (response.status === 200) {
          setEventData(dataComImagem);
          setMessage("Modificações salvas");
        }
  
        reset();
      } catch (error) {
        console.error(error.message);
        setMessage("Erro ao salvar as modificações");
      }
    } else {
      console.log("Não foi possível enviar");
      setMessage("Formulário inválido");
    }
  };
    return(
        <div className="page">
            <Head onIconClick={() => navigate(`/home/${userId}`)}/>
            <Main>
            <div className={style.top}>
                <h1>Editar Evento</h1>
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
            </div>
            <form onSubmit={handleSubmit(handleSave)}>
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
                        name2='SALVAR' 
                        onClickCancelar={handleCancelar}
                    />
            </form>
            </Main>
        </div>
    )
}