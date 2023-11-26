import { Link, useNavigate, useParams } from "react-router-dom";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getEventoByID } from "../services/eventosSevices";
import Icon from "../components/common/icons";
import style from "./Evento.module.css"
import Button from "../components/common/Button";
import { FindUserByID } from "../services/userServices";
import Footer from "../components/layout/Footer";
import useAuth from "../useAuth";

export default function Evento(){
    useAuth();
    const {userId, eventoId} = useParams();
    const [userData, setUserData] = useState();
    const [evento, setEvento] = useState();
    const navigate  = useNavigate();
    const [copiado, setCopiado] = useState(false);

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
    const fetchUserData = async () => {
        try {
          const userFound = await FindUserByID(userId, Cookies.get("token"));
          setUserData(userFound);
        } catch (error) {
          console.error('Erro ao buscar informações do usuário:', error);
        }
      };
    const handleCancelar = () => {
        navigate(`/home/${userId}`);
      };
    const handleEditar = () =>{
        navigate(`/editarevento/${userId}/${eventoId}`);
    };
    const handleConvidar = () =>{
        navigate(`/convite/${userId}/${eventoId}`);
    };
    const handleGastoChange = (event) => {
      const gastoId = event.target.selectedOptions[0].getAttribute('gastoid');
      
      if (gastoId) {
        navigate(`/gasto/${userId}/${eventoId}/${gastoId}`);
      }
    };
    const handleConvidadoChange = (event) => {
      const convidadoId = event.target.selectedOptions[0].getAttribute('convidadoid');
      if (convidadoId){

      }
    }
    async function respostaConvite(resposta){
      const data  = {idEvento: eventoId, idUsuario: userId, confirmar: resposta}
      const response = await respostaConvite(eventoId, resposta, Cookies.get("token"));
    }
    const handleCopyToClipboard = () => {
      navigator.clipboard.writeText(evento && evento.pix);
      setCopiado(true);
      alert("PIX copiado para a área de transferência");
    };


    function Base(){
      return(
        <>
        <div className={style.top}>
                    <h1 style={{textTransform: "uppercase"}}>{evento && evento.titulo}</h1>
                    <Icon 
                        img={evento && evento.imagem}
                        type={"foto-evento"}/>
                    </div>
                  <section>
                    <div className={style.info}>descrição: {evento && evento.descricao}</div>
    
                    <details>
                          <summary>convidados: {evento && evento.convidados.length}</summary>
                          {evento && evento.convidados.map((convidado, index) => (
                          <div>{convidado.username}</div>
                          ))}
                          
                      </details>
    
                      <div
                        className={style.info}
                        style={{ cursor: "pointer" }}
                        onClick={handleCopyToClipboard}
                      >
                        PIX: {evento && evento.pix}
                        <Icon type="copy"/>
                      </div>
    
                    <details>
                        <summary>gastos: {evento && evento.gastos.total}</summary>
                        {evento && evento.gastos.gasto.map((gasto, index) => (
                        <div>{gasto.valor + ' - ' + gasto.local}</div>
                        ))}
                    </details>
                  </section>
        </>
      )
    }
    if (userId === evento.admID){
      return(
        <div className="page">
        <Head onIconClick={handleCancelar}/>
        <Main>
          <Base/>
          <Button type={"add"}/>
          <Button 
          type={"editar/convidar"}
          name={"EDITAR"} name2={"CONVIDAR"}
          onClick={handleConvidar}
          onClickCancelar={handleEditar}/>

          <Link to={`/pagamento/${userId}/${eventoId}`}><button>LISTA DE PAGAMENTO</button></Link>
        </Main>
        <Footer/>
        </div>
      ) 
    }else if(eventoId in userData.convites){
      return(
        <div className="page">
        <Head onIconClick={handleCancelar}/>
        <Main>
          <Base/>
          <Button 
          type={"cancelar/confirmar"}
          name={"RECUSAR"} name2={"ACEITAR"}
          onClick={respostaConvite("aceito")}
          onClickCancelar={respostaConvite("recusado")}/>
        </Main>
        <Footer/>
        </div>
      )
    }else if(eventoId in userData.eventosConfirmados){
      return(
        <div className="page">
        <Head onIconClick={handleCancelar}/>
        <Main>
          <Base/>
          <Button 
          type={"confirmar"}
          name={"SAIR DO EVENTO"}/>
        </Main>
        <Footer/>
        </div>
      )
    }
}

