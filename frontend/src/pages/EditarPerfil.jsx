import Button from "../components/common/Button"
import Head from "../components/layout/Head"
import Main from "../components/layout/Main"
import Input from "../components/common/Input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FindUserByID, editarperfil, userDel } from "../services/userServices";
import Cookies from "js-cookie";
import style from "./Sign.module.css";
import Perfil from "../components/common/Perfil";
import { useNavigate, useParams } from "react-router-dom";
import { editarPerfilSchema } from "../Schemas/editarPerfilSchema";
import Modal from "../components/common/Modal";

export default function EditarPerfil(){
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
      } = useForm({
        resolver: zodResolver(editarPerfilSchema),
        mode: 'onChange',
      });
      const navigate  = useNavigate();
      const { userId } = useParams();

      const [openModal, setOpenModal] = useState(false);
      const [imagemBase64, setImagemBase64] = useState(null);
      const [message, setMessage] = useState(null);

      const [userData, setUserData] = useState();

        useEffect(() => {
            const fetchUserData = async () => {
            try {
                const userFound = await FindUserByID(userId, Cookies.get("token"));
                setUserData(userFound);
                setImagemBase64(userFound && userFound.avatar)
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
            };
          fetchUserData();
            
        },[message]);

      
      const handleImagemChange = (event) => {
        const imagemArquivo = event.target.files[0];
      
        if (imagemArquivo) {
          try {
            const reader = new FileReader();
            reader.onload = () => {
              const base64String = reader.result;
              setImagemBase64(base64String);
              console.log(base64String);
            };
            reader.readAsDataURL(imagemArquivo);
          } catch (error) {
            console.error('Erro ao converter a imagem em base64:', error.message);
          }
        } else {
          setImagemBase64(null);
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
            } else if (userData[chave] !== undefined) {
              dadosNaoVazios[chave] = userData[chave];
            }
          }

          const dataComImagem = { ...dadosNaoVazios, avatar: imagemBase64, _id: userId };
          console.log(dataComImagem);
      
          try{
            const response = await editarperfil(dataComImagem, Cookies.get("token"));
            console.log(response);
            if (response === 200){
              setUserData(dataComImagem)
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
    async function userDelete(){
      try{
        const response = await userDel(userId, Cookies.get("token"));
        console.log(response);
        
      }catch(error){
        console.error(error.message);
      }
    }
    return(
        <div className="page">
            <Head onIconClick={handleCancelar}/>
            <Modal type="userdel"
            isOpen={openModal} 
            setOpen={() => {
              setOpenModal(!openModal)}}
              onClick={userDelete}/>
            
            <Main>
            <div className={style.head}>
                <input
                    className={style.uploadimg}
                    type="file"
                    accept="image/*"
                    id="uploadInput"
                    onChange={handleImagemChange}
                />
                <label htmlFor="uploadInput" className={style.uploadLabel}>
                    <Perfil img={imagemBase64} />
                </label>
            </div>
            <Button name="deletar usuário" onClick={() => {
              setOpenModal(true)}}></Button>
            {message && <p className={style.message}>{message}</p>}
            <form onSubmit={handleSubmit(handleSave)}>
            <Input 
              reg={register}
              className={style.nome}
              id={userData && userData.nome} name='nome' type = 'text'
              onChange={() => setMessage(null)}/>
              {errors.nome && (
                          <p><span>{errors.nome.message}</span></p>
                        )}

              <Input 
              reg={register}
              className={style.nome}
              id={userData && userData.sobrenome} name='sobrenome' 
              type = 'text'
              onChange={() => setMessage(null)}/>
              {errors.sobrenome && (
                          <p><span>{errors.sobrenome.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= {userData && userData.username} name= 'username' type= 'text'
              onChange={() => setMessage(null)}/>
              {errors.username && (
                          <p><span>{errors.username.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= {userData && userData.telefone} name= 'telefone' type= 'number'
              onChange={() => setMessage(null)}/>
              {errors.telefone && (
                          <p><span>{errors.telefone.message}</span></p>
                        )}
              
              <Input 
              reg={register}
              id= 'nova senha' name= 'senha' type= 'password'
              onChange={() => setMessage(null)}/>
              {errors.senha2 && (
                          <p><span>{errors.senha2.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'repita a nova senha' name= 'senha2' type= 'password'
              onChange={() => setMessage(null)}/>
              {errors.senha2 && (
                          <p><span>{errors.senha2.message}</span></p>
                        )}
                <Button 
                        type='cancelar/confirmar' 
                        name='CANCELAR' 
                        name2='SALVAR' 
                        onClick={handleSave}
                        onClickCancelar={handleCancelar}
                />
            </form>
            
            </Main>
        </div>
        )
}