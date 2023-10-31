import style from "./Input.module.css"

function Input({id, name, type}){
    return(
        <div>
            <label htmlFor={id}></label>
            <input className={style.input} type={type} id={id} name={name} placeholder={id} />
        </div>
    )
}

export default Input