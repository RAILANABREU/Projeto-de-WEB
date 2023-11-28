import { Link, useNavigate, useParams } from "react-router-dom";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import { useEffect, useId, useState } from "react";
import Cookies from "js-cookie";
import Icon from "../components/common/icons";
import style from "./Evento.module.css"
import Button from "../components/common/Button";
import Footer from "../components/layout/Footer";
import useAuth from "../useAuth";
import useData from "../useData";
import { delConvidado, delGasto, respostaConvite } from "../services/eventosServices";
import Modal from "../components/common/Modal";

export default function Evento(){
    useAuth();
    const navigate  = useNavigate();
    const {userId, eventoId} = useParams();
    const { userData, eventoData } = useData(userId,eventoId);

    
    const [openModalGasto, setOpenModalGasto] = useState(false);
    const [openModalConvidado, setOpenModalConvidado] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [gastoSelecionado, setGastoSelecionado] = useState(null);
    const [convidadoSelecionado, setConvidadoSelecionado] = useState(null);
    const [message, setMessage] = useState(null);
    
    
    const [copiado, setCopiado] = useState(false);

    const atualizarPagina = () => {
      window.location.reload();
    };
    
    const handleAbrirModalGasto = (gasto) => {
      setGastoSelecionado(gasto);
      setOpenModalGasto(true);
    };
    const handleAbrirModalConvidado = (convidado) => {
      setConvidadoSelecionado(convidado);
      setOpenModalConvidado(true);
    };

    const handleCancelar = () => {
        navigate(`/home/${userId}`);
      };

    const handleCopyToClipboard = () => {
      navigator.clipboard.writeText(eventoData?.pix);
      setCopiado(true);
      alert("PIX copiado para a área de transferência");
    };
    //membro
    async function sairEvento(){
      const data = {idEvento: eventoId, idConvidado: userId};
      try{
        await delConvidado(data, Cookies.get("token"));

      }catch(error){
        setMessage("erro ao sair do evento")
      }
      navigate(`/home/${userId}`)
    }

    //covidado
    async function resConvite(resposta){
      const data  = {idEvento: eventoId, idUsuario: userId, confirmar: resposta}
      try{
        await respostaConvite(data, Cookies.get("token"));
      }catch(error){
        setMessage("erro ao enviar resposta")
      }
      navigate(`/home/${userId}`)
    }
    
    //adm
    async function deletarGasto(){
      const data = {idEvento: eventoId, idGasto: gastoSelecionado._id}
      try{
        const response = await delGasto(data, Cookies.get("token"));

        if(!response.success){
          console.error(response.error)
        }
      }catch(error){
        console.error("error ao excluir")
      }
      atualizarPagina();
    }
    async function deletarConvidado(){
      const data = {idEvento: eventoId, idConvidado: convidadoSelecionado._id}
      try{
        const response = await delConvidado(data, Cookies.get("token"));

        if(!response.success){
          console.error(response.error)
        }
      }catch(error){
        console.error("error ao excluir")
      }
      atualizarPagina();
    }

    //base da pagina
    function Base(){
      return(
        <>
        <div className={style.top}>
                    <h1 style={{textTransform: "uppercase"}}>{eventoData?.titulo}</h1>
                    <Icon 
                        img={eventoData?.imagem}
                        type={"foto-evento"}/>
                        {message && <p className="message">{message}</p>}
                    </div>
                  <section>
                    <div className={style.info}>descrição: {eventoData?.descricao}</div>
    
                    <details>
                          <summary>convidados: {eventoData?.convidados.length}</summary>
                          {eventoData?.convidados.map((convidado) => (
                          <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleAbrirModalConvidado(convidado)}
                          >
                          {convidado.username}
                          </div>
                          ))}
                          
                      </details>
    
                      <div
                        className={style.info}
                        style={{ cursor: "pointer" }}
                        onClick={handleCopyToClipboard}
                      >
                        PIX: {eventoData?.pix}
                        <Icon type="copy"/>
                      </div>
    
                    <details>
                        <summary>total gastos: {eventoData?.gastos.total}</summary>
                        {eventoData?.gastos.gasto.map((gasto) => (
                        <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAbrirModalGasto(gasto)}>
                          {gasto.valor + ' - ' + gasto.local}
                        </div>
                        ))}
                    </details>
                  </section>
        </>
      )
    }
    if (userId === eventoData?.admID){
      return(
        <div className="page">
        <Head onIconClick={handleCancelar}/>
        <Modal type="info"
          isOpen={openModalGasto} 
          setOpen={() => {setOpenModalGasto(!openModalGasto)}}
          onClick={deletarGasto}>
          <h2>Detalhes do Gasto</h2>
          <p>Local: {gastoSelecionado?.local}</p>
          <p>Descrição: {gastoSelecionado?.descricao}</p>
          <p>Valor: {gastoSelecionado?.valor}</p>
          </Modal>
          <Modal type="info"
          isOpen={openModalConvidado} 
          setOpen={() => {setOpenModalConvidado(!openModalConvidado)}}
          onClick={deletarConvidado}>
          <h2>Sobre</h2>
          <p className={style.p}>usuário: {convidadoSelecionado?.username}</p>
          <p className={style.p}>{`Pagou sua parte? ${convidadoSelecionado?.jaPagou ? 'PAGO' : 'NÃO PAGO'}`}</p>
          </Modal>
        <div className="containerCentral">
        <Main>
          <Base/>
          <Link to={`/gastos/${userId}/${eventoId}`}><Button type={"add"}/></Link>
          <Button 
          type={"editar/convidar"}
          name={"EDITAR"} name2={"CONVIDAR"}
          onClick={() =>{navigate(`/convite/${userId}/${eventoId}`)}}
          onClickCancelar={() =>{navigate(`/editarevento/${userId}/${eventoId}`)}}/>

          <Link to={`/pagamento/${userId}/${eventoId}`}><button>LISTA DE PAGAMENTO</button></Link>
        </Main>
        </div>
        
        <Footer/>
        </div>
      ) 
    }else if(userData?.convites?.some(convite => convite === eventoId)){
      return(
        <div className="page">
        <Head onIconClick={handleCancelar}/>
        <Main>
          <Base/>
          <Button 
          type={"cancelar/confirmar"}
          name={"RECUSAR"} name2={"ACEITAR"}
          onClick={() =>resConvite("aceito")}
          onClickCancelar={() =>resConvite("recusado")}/>
        </Main>
        <Footer/>
        </div>
      )
    }else if(userData?.eventosConfirmados.includes(eventoId)){
      return(
        <div className="page">
        <Head onIconClick={handleCancelar}/>
        <Modal
        type="sair"
        isOpen={openModal} 
        setOpen={() => {setOpenModal(!openModal)}}
        onClick={sairEvento}>
        Tem certeza que deseja sair do evento?
        </Modal>
        <Main>
          <Base/>
          <button style={{width: "95%",background: "none",color: "var(--accent-color)", border: "solid 2px var(--accent-color)"}}
          onClick={()=>setOpenModal(!openModal)}>SAIR DO EVENTO</button>
        </Main>
        <Footer/>
        </div>
      )
    }else{
      return(
        <div className="page">
        <Head onIconClick={handleCancelar}/>
        <Main>
          Você não faz parte desse evento
        </Main>
        <Footer/>
        </div>
      )
    }
  }

