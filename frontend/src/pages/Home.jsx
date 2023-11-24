import Cookies from "js-cookie";
import { Card } from "../components/common/Card";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import { getAllEvents } from "../services/eventosSevices";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import ModalUser from "../components/common/ModalUser";

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { userId } = useParams();
  const navigate  = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllEvents(Cookies.get("token"));
        console.log(response);
        setEventos(response.data.evento);

      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }
    fetchData();
    console.log(Cookies.get("token"))
  },[]);
  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const eventoPage = (eventoId) =>{
    navigate(`/evento/${userId}/${eventoId}`)
  }

  return (
    <div className="page">
      <Head type='home' onIconClick={openDrawer}/>
      <ModalUser 
      isOpen={isDrawerOpen} 
      setOpen={() => setDrawerOpen(!isDrawerOpen)} 
      userId={userId}
      authToken={Cookies.get("token")}/>
      <Main>
        <Link to={`/criarevento/${userId}`}><button>CRIAR EVENTO</button></Link>
        <Link to="/convites"><button style={{ background: "var(--secondary-color)" }}>CONVITES</button></Link>
        {eventos.length > 0 ? (
          eventos.map((item) => (
            item.adm === userId ? (
              <Card 
                key={item.id} 
                eventos={item} 
                foto={item.imagem} 
                titulo={item.titulo} 
                //onClick={eventoPage(item.id)}
              />
            ) : null
          ))
        ) : (
          <div style={{ flex: 1}}>
            Nenhum evento encontrado.
          </div>
        )}
      </Main>
      <Footer/>    
    </div>
  );
}
