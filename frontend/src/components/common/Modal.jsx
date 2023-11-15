import style from "./Modal.module.css"
import Button from "./Button"

export default function Modal ({isOpen, setOpen, children}){

    if (isOpen){
        return(
            <div className={style.background}>
                <div className={style.modal}>
                    <h2 className={style.h2}>Secrect Words</h2>
                    <p className={style.p}>As <em lang="en">Secrect Words</em> são palavras chaves para a recuperação de senha, é importante que você as guarde. </p>
                    <section className={style.section}>{children}</section>
                    <Button onClick={setOpen}type="confirmar" name="ENTENDI!"/>
                </div>
            </div>
        )
    }
    return null
} 