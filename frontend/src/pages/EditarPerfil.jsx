import Button from "../components/common/Button"
import Head from "../components/layout/Head"
import Main from "../components/layout/Main"
import Input from "../components/common/Input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FindUserByID, editarperfil } from "../services/userServices";
import Cookies from "js-cookie";
import style from "./Sign.module.css";
import Perfil from "../components/common/Perfil";
import { useNavigate, useParams } from "react-router-dom";
import { editarPerfilSchema } from "../Schemas/editarPerfilSchema";

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
      const [imagemBase64, setImagemBase64] = useState(null);
      const [message, setMessage] = useState(null);

      const [userData, setUserData] = useState();

        useEffect(() => {
            const fetchUserData = async () => {
            try {
                const userFound = await FindUserByID(userId, Cookies.get("token"));
                setUserData(userFound);
                setImagemBase64(userData.avatar)
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
            };
        if (userId) {
            fetchUserData();
            }
        }, [userId]);

      const handleImagemChange = (event) => {
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
      };
    const handleCancelar = () => {
        reset();
        navigate(`/home/${userId}`);
    };
    async function handleSave(data) {
        if (isValid) {
          const dataComImagem = { ...data, avatar: imagemBase64 };
          console.log(dataComImagem);
      
          try{
            const response = await editarperfil(dataComImagem, Cookies.get("token"));
            console.log(response);
            const {status, data} = response;
            if (status === 201){
              setMessage("Modificações salvas");
            }
            reset();
          }catch(error){
            console.error(error.message);
          }
          
        } else {
          console.log("não foi possivel enviar");
        }
      }
    
    return(
        <div className="page">
            <Head onIconClick={handleCancelar}/>
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
            <p className={style.p}>{message}</p>
            <form onSubmit={handleSubmit(handleSave)}>
            <Input 
              reg={register}
              className={style.nome}
              id={userData && userData.nome} name='nome' type = 'text'/>
              {errors.nome && (
                          <p><span>{errors.nome.message}</span></p>
                        )}

              <Input 
              reg={register}
              className={style.nome}
              id={userData && userData.sobrenome} name='sobrenome' type = 'text'/>
              {errors.sobrenome && (
                          <p><span>{errors.sobrenome.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= {userData && userData.username} name= 'username' type= 'text'/>
              {errors.username && (
                          <p><span>{errors.username.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= {userData && userData.telefone} name= 'telefone' type= 'number'/>
              {errors.telefone && (
                          <p><span>{errors.telefone.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'senha atual' name= 'senha' type= 'password'/>
              {errors.senha && (
                          <p><span>{errors.senha.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'nova senha' name= 'senha2' type= 'password'/>
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