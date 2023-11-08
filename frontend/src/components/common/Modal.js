import style from "./Modal.module.css"

export default function Modal ({isOpen, children}){


    if (isOpen){
        return(
            <div className={style.background}>
                <div className={style.modal}>{children}</div>
            </div>
        )
    }
} 