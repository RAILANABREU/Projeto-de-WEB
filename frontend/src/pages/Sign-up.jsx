import Main from "../components/layout/Main";
import Footer from "../components/layout/Footer"
import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";
import Perfil from "../components/common/Perfil";
import style from "./Sign.module.css";
import Modal from "../components/common/Modal";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../Schemas/signupSchema";
import { signup } from "../services/userServices";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

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

  const checkboxRef = useRef();
  const [message, setMessage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [termosAceitos, setTermosAceitos] = useState(false);
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
      reader.onloadend = () => {
          setImagemBase64(reader.result);
      };

      reader.readAsDataURL(imagemArquivo);
      }else{
      setImagemBase64("");
      }
  };

  async function onSubmit(data) {    
    if (isValid && termosAceitos) {
      const dataComImagem = { ...data, avatar: imagemBase64 };
      try{
        const response = await signup(dataComImagem);

        if (response.success){
          const {message, user} = response.data
          setUsuario(user);
          Cookies.set("token", user.token, { expires: 1});
          setOpenModal(true);
          reset();
        }else{
          setMessage(response.error)
        }
      }catch(error){
        console.error(error.message)
      }
      
    } else {
      console.error("não foi possivel enviar");
    }
  }
  return(
      <div className="page">
        <Modal type="up" 
        isOpen={openModal} 
        setOpen={() => {
          setOpenModal(!openModal);
          handleRedirecionamento(usuario.id)}}>
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
            <Perfil img={imagemBase64} />
          </label>
        </div>

        <div className={style.central}>
          <Main>
            <h1>CADASTRO</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input 
              reg={register}
              className={style.nome}
              id='nome' name='nome' type = 'text'/>
              {errors.nome && (
                          <p className="error"><span>{errors.nome.message}</span></p>
                        )}

              <Input 
              reg={register}
              className={style.nome}
              id='sobrenome' name='sobrenome' type = 'text'/>
              {errors.sobrenome && (
                          <p className="error"><span>{errors.sobrenome.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'usuário' name= 'username' type= 'text'/>
              {errors.username && (
                          <p className="error"><span>{errors.username.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'celular' name= 'telefone' type= 'number'/>
              {errors.telefone && (
                          <p className="error"><span>{errors.telefone.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'senha' name= 'senha' type= 'password'/>
              {errors.senha && (
                          <p className="error"><span>{errors.senha.message}</span></p>
                        )}
              <Input 
              reg={register}
              id= 'repita a senha' name= 'senha2' type= 'password'/>
              {errors.senha2 && (
                          <p className="error"><span>{errors.senha2.message}</span></p>
                        )}

              <div className="requisitos-senha"></div>

              <div className="checkbox-container">
                  <Checkbox 
                  text='Concordo com os termos de serviço'
                  ref={checkboxRef}
                  onCheckboxChange={handleCheckboxChange}
                  {...register("termos", { required: "Você deve concordar com os termos" })}
                  />
                  {errors.termos && (
                  <p className="error">{errors.termos.message}</p>
                  )}
              </div>
              <button type="submit"
              disabled={termosAceitos === false}
              >CRIAR CONTA</button>
              <p className={style.p}>Já tem uma conta?<Link to ="/signin">Entrar</Link></p>
              
            </form>
          </Main>
        </div>
        <Footer/>
      </div>
    )
}

export default SignUp