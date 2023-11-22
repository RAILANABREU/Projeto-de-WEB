import Cookies from "js-cookie";
import { Card } from "../components/common/Card";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import { getAllEvents } from "../services/eventosSevices";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import ModalUser from "../components/common/ModalUser";

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { userId } = useParams();

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
  const closeDrawer = () => {
    setDrawerOpen(false);
  };


  return (
    <div className="page">
      <Head type='home' onIconClick={openDrawer}/>
      <ModalUser 
      isOpen={isDrawerOpen} 
      setOpen={closeDrawer} 
      userId={userId}
      authToken={Cookies.get("token")}/>
      <Main>
        <button>CRIAR EVENTO</button>
        {eventos?.map((item, index) => (
          <Card 
            key={index}
            eventos={item}
            foto={item.imagem}
            titulo={item.titulo}
          />
        ))}
      </Main>
      <Footer/>    
    </div>
  );
}
