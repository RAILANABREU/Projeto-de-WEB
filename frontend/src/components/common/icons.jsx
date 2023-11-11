import burge from "../../assets/hamburger-icon.png"
import homeicon from "../../assets/home-icon.png"
import fotoevento from "../../assets/foto-evento.png"
import fotocomprovante from "../../assets/foto-comprovante.png"
import copia from "../../assets/copy-icon.png"
import style from "../Img.module.css"

export default function Icon({type}){
    if (type == 'burge'){
        return(
            <img className={style.burge} src={burge} alt="icone de barra lateral"></img>
        )
    }
    else if (type == 'home'){
        return(
            <img className={style.homeicon} src={homeicon} alt="icone de barra lateral"></img>
        )
    }
    else if (type =='foto-evento'){
        return(
            <img className={style.image} src={fotoevento} alt="botao de upload de imagem do evento"></img>
        )
    }
    else if (type =='foto-comprovante'){
        return(
            <img className={style.image} src={fotocomprovante} alt="botao de upload de imagem do comprovante"></img>
        )
    }
    else if (type =='copy'){
        return(
            <img scr={copia} alt=''/>
        )
    }
}