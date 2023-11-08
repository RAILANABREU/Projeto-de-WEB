import style from "./Modal.module.css"
import Button from "./Button"

export default function Modal ({isOpen, setOpen, children}){

    if (isOpen){
        return(
            <div className={style.background}>
                <div className={style.modal}>
                    {children}
                    <Button onClick={setOpen}type="confirmar" name="ENTENDI!"/>
                </div>
            </div>
        )
    }
    return null
} 