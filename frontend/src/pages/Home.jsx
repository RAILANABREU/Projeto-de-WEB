import Cookies from "js-cookie"
import { eventos } from "../Datas"
import { Card } from "../components/common/Card"
import Head from "../components/layout/Head"
import Main from "../components/layout/Main"
import { getAllEvents } from "../services/eventosSevices"
import { useParams } from 'react-router-dom';
import { useEffect } from "react"
//import {useState} from "react"

export default function Home(){
    useEffect(() => {
        console.log(Cookies.get("token"))
    })
    //const[eventos, setEventos] = useState([]);
    const { userId } = useParams();
    async function findAllEvents(){
        const response = await getAllEvents(userId);
        console.log(response);
        //setEventos(response.data.results);
    }
//Substituir 'eventos' dos dados mocados pela response.data.results quando o back tiver pronto
        //findAllEvents()
    return(
        <div className="page">
            <Head type='home'/>
            <Main>
            <button>CRIAR EVENTO</button>
            {eventos.map((item, index) =>(
                <Card 
                key={index}
                eventos={item}
                foto={item.foto}
                titulo={item.titulo}/>
                ))}
            </Main>    
        </div>
    )
}
