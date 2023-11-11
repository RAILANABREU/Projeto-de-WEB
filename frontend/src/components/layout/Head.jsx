import style from "./Head.module.css"
import Logo from "./Logo"
import Icon from "../common/icons"

export default function Head ({type}){
    if (type == 'home'){
        return(
            <div className={style['head-home']}>
            <Logo type='1'/>
            <Icon type='burge'/>
            </div>  
        )
    }else{
        return (
            <div className={style.head}>
                    <Logo type='1'/>
                    <Icon type='home'/>
                </div>
        )
    }
}