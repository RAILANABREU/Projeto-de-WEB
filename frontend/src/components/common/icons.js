import burge from "../../assets/hamburger-icon.png"
import homeicon from "../../assets/home-icon.png"
import image from "../../assets/img.png"
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
    else if (type =='img'){
        return(
            <img className={style.image} src={image} alt="botao de upload de imagem"></img>
        )
    }
}