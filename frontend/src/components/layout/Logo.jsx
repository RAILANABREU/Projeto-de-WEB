import Iconname from "../../assets/iconname.png"
import Icon from "../../assets/icon.png"
import style from "../Img.module.css"

function Logo({type}){
    if (type == 1){
        return(
            <img className={style.icon} src={Icon} alt="Logo"/>
        )
    }
    else if (type == 2){
        return(
            <img className={style.iconname} src={Iconname} alt="Logo"/>
        )
    }
    else if (type == 3){
        return(
            <img className={style.bigiconname} src={Iconname} alt="Logo"/>
        )
    }
}

export default Logo