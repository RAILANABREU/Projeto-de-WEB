import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editEventSchema } from "../Schemas/eventSchema";
import { editarEvento, excluirEvento } from "../services/eventosServices";
import Cookies from "js-cookie";
import style from "./EditarEvento.module.css";
import Icon from "../components/common/icons";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import useAuth from "../useAuth";
import useImageUpload from "../useImage";
import Modal from "../components/common/Modal";

export default function EditarEvento() {
  useAuth();
  const { userId, eventoId } = useParams();
  const navigate = useNavigate();
  const { imagemBase64, handleImagemChange} = useImageUpload();
  const [message, setMessage] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
          value !== null && value !== "" ? value : "",
        ])
      );
    
      const dataComImagem = { ...dadosNaoVazios, imagem: imagemBase64, id: eventoId };  
      try {
        const response = await editarEvento(dataComImagem, Cookies.get("token"));
  
        setEventData(dataComImagem);
        setMessage("Modificações salvas");
  
        reset();
      } catch (error) {
        console.error(error.message);
        setMessage("Erro ao salvar as modificações");
      }
    } else {
      console.error("Não foi possível enviar");
      setMessage("Formulário inválido");
    }
  };
  const delEvento = async () =>{
    try {
      const response = await excluirEvento(eventoId, Cookies.get("token"));

      if (response.success) {
        setMessage("Evento Excluido com sucesso");
        reset();
        navigate(`/home/${userId}`);
      }

    } catch (error) {
      console.error(error.message);
      setMessage("Erro ao salvar as modificações");
    }
  }
    return(
        <div className="page">
            <Head onIconClick={() => navigate(`/home/${userId}`)}/>
            <Modal type="del"
            isOpen={openModal} 
            setOpen={() => {
              setOpenModal(!openModal)}}
              onClick={delEvento}>Confirmar a exclusão do evento resultará na remoção permanente do evento e de todas as informações associadas a ele. Esta ação é irreversível. Deseja prosseguir?</Modal>
            <div className="containerCentral">
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
                <Button name={"deletar evento"} onClick={() => setOpenModal(true)}/>
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
            
        </div>
    )
}