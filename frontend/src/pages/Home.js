import { eventos } from "../Datas"
import { Card } from "../components/common/Card"
import Head from "../components/layout/Head"
import Main from "../components/layout/Main"
import { getAllEvents } from "../services/eventosSevices"
//import {useState} from "react"

export default function Home(){
    //const[eventos, setEventos] = useState([]);

    async function findAllEvents(){
        const response = await getAllEvents();
        console.log(response);
        //setEventos(response.data.results);
    }
//Substituir 'eventos' dos dados mocados pela response.data.results quando o back tiver pronto
        //findAllEvents()
    return(
        <div className="page">
            <Head type='home'/>
            <div>
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
        </div>
    )
}
