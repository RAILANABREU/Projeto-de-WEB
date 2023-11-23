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

    const handleCancelar = () => {
        reset();
        navigate(`/home/${userId}`);
      };
    
      const handleCriar = (data) => {
        navigate("/evento")
      };
    

    return(
        <div className="page">
            <Head/>
            <Main>
                <h1>CRIAR EVENTO</h1>
                <Icon type = 'foto-evento'/>
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