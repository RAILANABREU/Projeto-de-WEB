import Foto from "../../assets/perfil.png"
import style from "../Img.module.css"

function Perfil(){
    return(
        <img className={style.perfil} src={Foto} alt="Perfil"/>
    )
}

export default Perfil