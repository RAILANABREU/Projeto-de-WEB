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
  const [openModal, setOpenModal] = useState(true);
  //ao receber secretwords resposta do backend setOpenModal(true)
  
  const [termosAceitos, setTermosAceitos] = useState(false);
  const handleCheckboxChange = () => {
    setTermosAceitos(!termosAceitos);
  };
  const [imagem, setImagem] = useState(null);
  const [imagemBase64, setImagemBase64] = useState(null);

  const handleImagemChange = (event) => {
    const imagemArquivo = event.target.files[0];

    if (imagemArquivo) {
      const reader = new FileReader();
      setImagem(imagemArquivo);
      reader.onloadend = () => {
        setImagemBase64(reader.result);
      };

      reader.readAsDataURL(imagemArquivo);
    }
  };

  async function onSubmit(data) {
    
    if (isValid && termosAceitos) {
      const dataComImagem = { ...data, avatar: imagemBase64 };
      console.log(dataComImagem);
  
      // Lógica para enviar os dados para o backend
      try{
        const response = await signup(data);
        console.log(response)
      }catch(error){
        console.log(error);
      }
  
      // Resetando o estado da imagemBase64 e do formulário
      setImagemBase64(null);
      reset();
    } else {
      console.log("não foi possivel enviar");
    }
  }
  return(
      <div className="page">
        <Modal isOpen={openModal} 
        setOpen={() => setOpenModal(!openModal)}>
          teste
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
                          <p><spam>{errors.nome.message}</spam></p>
                        )}

              <Input 
              reg={register}
              className={style.nome}
              id='sobrenome' name='sobrenome' type = 'text'/>
              {errors.sobrenome && (
                          <p><spam>{errors.sobrenome.message}</spam></p>
                        )}
              <Input 
              reg={register}
              id= 'usuário' name= 'username' type= 'text'/>
              {errors.username && (
                          <p><spam>{errors.username.message}</spam></p>
                        )}
              <Input 
              reg={register}
              id= 'celular' name= 'celular' type= 'number'/>
              {errors.celular && (
                          <p><spam>{errors.celular.message}</spam></p>
                        )}
              <Input 
              reg={register}
              id= 'senha' name= 'senha' type= 'password'/>
              {errors.senha && (
                          <p><spam>{errors.senha.message}</spam></p>
                        )}
              <Input 
              reg={register}
              id= 'repita a senha' name= 'senha2' type= 'password'/>
              {errors.senha2 && (
                          <p><spam>{errors.senha2.message}</spam></p>
                        )}

              <div className="requisitos-senha"></div>

              <div className="checkbox-container">
                  <Checkbox 
                  text='Concordo com os termos de serviço'
                  onCheckboxChange={handleCheckboxChange}
                  {...register("termos", { required: "Você deve concordar com os termos" })}
                  />
                  {errors.termos && <p><spam>{errors.termos.message}</spam></p>}
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