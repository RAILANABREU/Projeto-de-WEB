import Foto from "../../assets/perfil-foto.png"
import style from "../Img.module.css"

function Perfil({img}){
    if (img){
        return <img className={style.perfil} src={URL.createObjectURL(img)} alt="Perfil"/>
    }else{
        return <img className={style.default} src={Foto} alt="Perfil"/>
        
    }
    
}

export default Perfil