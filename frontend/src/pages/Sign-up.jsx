import Main from "../components/layout/Main";
import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";
import Perfil from "../components/common/Perfil";
import style from "./Sign.module.css";
import Modal from "../components/common/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../Schemas/signupSchema";
import { signup } from "../services/userServices";
import { useNavigate } from 'react-router-dom';

function SignUp(){
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });
  const navigate  = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [imagemBase64, setImagemBase64] = useState(null);
  const [usuario, setUsuario] = useState(null);
  
  const handleCheckboxChange = () => {
    setTermosAceitos(!termosAceitos);
  };
  const handleRedirecionamento = (userId) => {
    navigate(`/home/${userId}`);
  };
  const handleImagemChange = (event) => {
    const imagemArquivo = event.target.files[0];

    if (imagemArquivo) {
      const reader = new FileReader();
      setImagem(imagemArquivo);
      reader.onloadend = () => {
        setImagemBase64(reader.result);
      };

      reader.readAsDataURL(imagemArquivo);
    }else{
      imagemBase64 = "";
    }
  };

  async function onSubmit(data) {
    
    if (isValid && termosAceitos) {
      const dataComImagem = { ...data, avatar: imagemBase64 };
      console.log(dataComImagem);
  
      // Lógica para enviar os dados para o backend
      try{
        const response = await signup(dataComImagem);
        console.log(response)
        const {status, data} = response;
        if (status === 201){
          const {message, user} = data;
          console.log(message)
          setUsuario(user);
          setOpenModal(true)
          if (setOpenModal === false){
            handleRedirecionamento(user.id)
          }
        }

      }catch(error){
        console.log(error);
      }

      reset();
    } else {
      console.log("não foi possivel enviar");
    }
  }
  return(
      <div className="page">
        <Modal isOpen={openModal} 
        setOpen={() => setOpenModal(!openModal)}>
          {usuario && usuario.secretWords}
        </Modal>
        <div className={style.head}>
          <input
            className={style.uploadimg}
            type="file"
            accept="image/*"
            id="uploadInput"
            onChange={handleImagemChange}
          />
          <label htmlFor="uploadInput" className={style.uploadLabel}>
            <Perfil img={imagem} />
          </label>
        </div>
        <Main>
            <h1>CADASTRO</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input 
              reg={register}
              className={style.nome}
              id='nome' name='nome' type = 'text'/>
              {errors.nome && (
                          <p><span>{errors.nome.message}</span></p>
                        )}

              <Input 
              reg={register}
              className={style.nome}
              id='sobrenome' name='sobrenome' type = 'text'/>
              {errors.sobrenome && (
                          <p><span>{errors.sobrenome.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'usuário' name= 'username' type= 'text'/>
              {errors.username && (
                          <p><span>{errors.username.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'celular' name= 'telefone' type= 'number'/>
              {errors.telefone && (
                          <p><span>{errors.telefone.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'senha' name= 'senha' type= 'password'/>
              {errors.senha && (
                          <p><span>{errors.senha.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'repita a senha' name= 'senha2' type= 'password'/>
              {errors.senha2 && (
                          <p><span>{errors.senha2.message}</span></p>
                        )}

              <div className="requisitos-senha"></div>

              <div className="checkbox-container">
                  <Checkbox 
                  text='Concordo com os termos de serviço'
                  onCheckboxChange={handleCheckboxChange}
                  {...register("termos", { required: "Você deve concordar com os termos" })}
                  />
                  {errors.termos && <p><span>{errors.termos.message}</span></p>}
              </div>
              <button type="submit"
              disabled={isValid === false || termosAceitos === false}
              >CRIAR CONTA</button>
              <p className={style.p}>Já tem uma conta?<a href="#">Entrar</a></p>
              
            </form>
        </Main>
      </div>
    )
}

export default SignUp