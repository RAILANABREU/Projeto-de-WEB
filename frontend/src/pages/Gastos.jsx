import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Icon from "../components/common/icons";
import Footer from "../components/layout/Footer"
import useAuth from "../useAuth";
import useData from "../useData";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gastoSchema } from "../Schemas/gastoSchema";
import { addGasto } from "../services/eventosServices";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Gastos(){
    useAuth();
    const {userId, eventoId} = useParams();
    const { userData, eventoData } = useData(userId,eventoId);
    const {message, setMessage} = useState();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        resolver: zodResolver(gastoSchema),
        mode: 'onChange',
    });
    const navigate = useNavigate()

    const handleAdicionar = async(dadosGasto) =>{
        dadosGasto.valor = parseFloat(dadosGasto.valor.replace(',', '.'));
        const dados = { gasto: dadosGasto, idEvento: eventoId};
        console.log(dados);
        if (isValid){
            try{
              const response = await addGasto(dados, Cookies.get("token"));
              console.log(response)
      
              if (response.success){
                console.log("gasto add");
                navigate(`/evento/${userId}/${eventoId}`);
              }else{
                console.error(response.error)
                setMessage("Erro ao adicionar gasto")
              }
              
              reset()
            }catch(error){
              console.error(error.message)
            }
            
          }else {
            console.log("não foi possivel enviar");
          }
      }

    return(
        <div className="page">
            <Head/>
            <Main>
                <h1>GASTOS</h1>
               
                <form onSubmit={handleSubmit(handleAdicionar)}>
                    {message && (<p style={{color: "red"}}>{message}</p>
                            )}
                    <Input
                    reg={register}
                    id ="local"
                    name="local"
                    type="text"/>
                    {errors.local && (
                          <p className="error"><span>{errors.local.message}</span></p>
                        )}
                    <Input
                    reg={register}
                    id ="descricao"
                    name="descricao"
                    type="text"/>
                    {errors.descricao && (
                          <p className="error"><span>{errors.descricao.message}</span></p>
                        )}
                    <Input
                    reg={register}
                    id ="valor"
                    name="valor"
                    type="text"/>
                    {errors.valor && (
                          <p className="error"><span>{errors.valor.message}</span></p>
                        )}
                    <Button type="cancelar/confirmar"
                    name='CANCELAR'
                    name2='ADICIONAR'
                    onClickCancelar={() => navigate(`/evento/${userId}/${eventoId}`)}/>
                </form>

            </Main>
            <Footer/>
        </div>
    )
}