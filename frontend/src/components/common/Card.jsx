import { Link, useParams } from "react-router-dom";
import style from "./Card.module.css"

export function Card({foto, titulo, id}){
    const eventoId = id;
    const {userId} = useParams()
    const fotoURL = foto;
    return(
        <Link className={style.link}  to={`/evento/${userId}/${eventoId}`}>
            <div className={style.card}>
            <div className={style.background} style={{ backgroundImage: `url(${fotoURL})`}}/>
            <h1 className={style.titulo}>{titulo}</h1>
            </div>
        </Link>
                
    )
}