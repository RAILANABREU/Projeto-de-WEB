import style from "./Button.module.css"
import Icon from "./icons"

export default function Button ({type, name, name2}){
    if (type == 'cancelar')
        return(
            <button className={style.cancelar}>{name}</button>
        )
    else if (type == 'confirmar'){
        return(
            <button className={style.criar}>{name}</button>
        )
    }
    else if (type == 'cancelar/confirmar')
        return(
            <div className={style['button-box']}>
                <button className={style.cancelar}>{name}</button>
                <button className={style.criar}>{name2}</button>       
            </div>
        )
    else if (type == 'add'){
        return(
            <button className={style.add}> + Gasto</button>
        )
    }
    else if (type == 'convite'){
        return(
            <button className={style.convite}>
                CONVITE
                <Icon type='copy'/>
            </button>
        )
    }
}