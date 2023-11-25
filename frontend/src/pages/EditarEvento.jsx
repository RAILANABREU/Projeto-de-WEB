import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "../Schemas/CreateEventSchema";
import { editarEvento } from "../services/eventosSevices";
import Cookies from "js-cookie";
import style from "./EditarEvento.module.css";
import Icon from "../components/common/icons";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function EditarEvento(){
    const {userId, eventoId} = useParams;
    const navigate  = useNavigate();
    const [imagemBase64, setImagemBase64] = useState(null);
    const [message, setMessage] = useState(null);
    const [eventData, setEventData] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        resolver: zodResolver(createEventSchema),
        mode: 'onChange',
    });
    
    const handleImagemChange = (event) => {
        const imagemArquivo = event.target.files[0];
        setMessage(null);

        if (imagemArquivo) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagemBase64(reader.result);
            setEventData((prevUserData) => ({
              ...prevUserData,
              imagem: reader.result,
            }));
          };
          reader.readAsDataURL(imagemArquivo);
        }else{
          setImagemBase64("");
        }
      };
    const handleCancelar = () => {
        reset();
        navigate(`/home/${userId}`);
    };
    async function handleSave(data) {
        if (isValid) {
          let dadosNaoVazios = {};
          
          for (let chave in data) {
            if (data[chave] !== null && data[chave] !== "") {
              dadosNaoVazios[chave] = data[chave];
            } else if (eventData[chave] !== undefined) {
              dadosNaoVazios[chave] = eventData[chave];
            }
          }
          
          const dataComImagem = { ...dadosNaoVazios, avatar: imagemBase64, _id: userId };
          console.log(dataComImagem);
      
          try{
            const response = await editarEvento(dataComImagem, Cookies.get("token"));
            console.log(response);
            if (response === 200){
              setEventData(dataComImagem)
              setMessage("Modificações salvas");
            }
            reset();
          }catch(error){
            console.error(error.message);
          }
        }else{
          console.log("não foi possivel enviar");
        }
      }
    return(
        <div className="page">
            <Head onIconClick={() => navigate(`/home/${userId}`)}/>
            <Main>
            <div className={style.top}>
                <h1>CONVITE</h1>
                <Icon type={"foto-evento"}/>
            </div>
            <form onSubmit={handleSubmit(handleSave)}>
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
                        name2='SALVAR' 
                        onClickCancelar={handleCancelar}
                    />
            </form>
            </Main>
        </div>
    )
}