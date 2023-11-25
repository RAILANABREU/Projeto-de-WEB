import { Link, useNavigate, useParams } from "react-router-dom";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getEventoByID } from "../services/eventosSevices";
import Icon from "../components/common/icons";
import style from "./Evento.module.css"
import Button from "../components/common/Button";

export default function Evento(){
    const {userId, eventoId} = useParams();
    const [evento, setEvento] = useState();
    const navigate  = useNavigate();
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await getEventoByID(eventoId, Cookies.get("token"));
            console.log(response);
            setEvento(response.evento)
    
          } catch (error) {
            console.error("Erro ao buscar evento:", error);
          }
        }
        fetchData();
      },[]);

    const handleCancelar = () => {
        navigate(`/home/${userId}`);
      };
    const handleEditar = () =>{
        navigate(`/editarevento/${userId}/${eventoId}`);
    };
    const handleConvidar = () =>{
        navigate(`/convite/${userId}/${eventoId}`);
    };
    return(
        <div className="page">
            <Head onIconClick={handleCancelar}/>
            <Main>
                <div className={style.top}>
                <h1 style={{textTransform: "uppercase"}}>{evento && evento.titulo}</h1>
                <Icon 
                    img={evento && evento.imagem}
                    type={"foto-evento"}/>
                
                </div>
                <div className={style.info}>descrição: {evento && evento.descricao}</div>
                <div className={style.info}>convidados:{evento && evento.covidados}</div>
                <div className={style.info}>PIX: {evento && evento.pix}<Icon type={"copy"}/></div>
                <div className={style.info}>gastos: {evento && evento.gastos.gasto}</div>

                <Button type={"editar/convidar"} name={"EDITAR"} name2={"CONVIDAR"}
                onClick={handleConvidar}
                onClickCancelar={handleEditar}/>
                <Link to={`/pagamento/${userId}/${eventoId}`}><button>LISTA DE PAGAMENTO</button></Link>
                
                
            </Main>
        </div>
    )
}