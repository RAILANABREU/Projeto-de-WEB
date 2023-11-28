import { Link, useParams } from "react-router-dom";
import style from "./Card.module.css"
import useDataEvent from "../../useDataEvent";

export function Card({id}){
    const eventoId = id;
    const {eventoData} = useDataEvent(id);
    const {userId} = useParams();
    const fotoURL = eventoData?.imagem;

    return(
        <Link className={style.link}  to={`/evento/${userId}/${eventoId}`}>
            <div className={style.card}>
            <div className={style.background} style={{ backgroundImage: `url(${fotoURL})`}}/>
            <h1 className={style.titulo}>{eventoData?.titulo}</h1>
            </div>
        </Link>     
    )
}