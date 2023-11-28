import style from "./Modal.module.css"
import Button from "./Button"

export default function Modal ({isOpen, setOpen, children, type, onClick}){
    
    if (isOpen){
        if (type == "up"){
            return(
            
            <div className={style.background}>
                <div className={style.modal}>
                    <h2 className={style.h2}>Secrect Words</h2>
                    <p className={style.p1}>As <em lang="en">Secrect Words</em> são palavras chaves para a recuperação de senha, é importante que você as guarde. </p>
                    <section className={style.section}>{children}</section>
                    <Button onClick={setOpen}type="confirmar" name="ENTENDI!"/>
                </div>
            </div>)
        }
        if (type == "del"){
            return(
            
            <div className={style.background}>
                <div className={style.modal}>
                    <h2 className={style.h2}>Confirmação</h2>
                    <p className={style.p1}>{children}</p>
                    <Button 
                    onClickCancelar={setOpen}
                    onClick={onClick}
                    type="cancelar/confirmar" name="CANCELAR" name2="EXCLUIR"/>
                </div>
            </div>)
        }
        if (type == "info"){
            return(
            <div className={style.background}>
                <div className={style.modal}>
                    <p className={style.p1}>{children}</p>
                    <Button 
                    onClickCancelar={setOpen}
                    onClick={onClick}
                    type="cancelar/confirmar" name="X" name2="REMOVER"/>
                </div>
            </div>)
        }
    }
    return null
} 