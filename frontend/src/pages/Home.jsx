import Cookies from "js-cookie";
import { Card } from "../components/common/Card";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import { getAllEvents } from "../services/eventosServices";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import ModalUser from "../components/common/ModalUser";
import useAuth from "../useAuth";
import { FindUserByID } from "../services/userServices";

export default function Home() {
  useAuth();
  const [eventos, setEventos] = useState([]);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [userData, setUserData] = useState();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 800);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllEvents(Cookies.get("token"));
                setEventos(response.data.evento);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            }

            try {
                const user = await FindUserByID(userId, Cookies.get("token"));
                setUserData(user);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        function handleResize() {
            setIsLargeScreen(window.innerWidth > 800);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isLargeScreen) {
            setDrawerOpen(true); // Sempre aberto em telas grandes
        } else {
            setDrawerOpen(false); // Fecha o modal em telas menores
        }
    }, [isLargeScreen]);

    const openDrawer = () => {
        setDrawerOpen(true);
    };



  return (
    <div className="page">
      <Head type='home' onIconClick={openDrawer}/>
      <ModalUser 
      isOpen={isDrawerOpen} 
      setOpen={() => setDrawerOpen(!isDrawerOpen)} 
      userId={userId}
      authToken={Cookies.get("token")}/>
      <Main>
        <div className="top">
        <Link to={`/criarevento/${userId}`}><button>CRIAR EVENTO</button></Link>
        <details>
          <summary>CONVITES</summary>
          {userData?.convites.map((item) => (
            <div className="conviteContainer">
              <Card
                id={item}/>
            </div>
          ))}
        </details>
        </div>
        <div className="eventoContainer">
        {eventos.map((item) => (
          (item.admID === userId || userData?.eventosConfirmados.includes(item._id)) ? (
            <Card 
              id={item._id} 
              eventos={item} 
              foto={item.imagem} 
              titulo={item.titulo} 
            />
          ) : null
        ))}
        </div>
      </Main>
      <Footer/>    
    </div>
  );
}
