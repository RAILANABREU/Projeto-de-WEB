import style from "./Input.module.css";

function Input({id, reg, name, type}){
    return(
        <div>
            <label htmlFor={id}></label>
            <input className={style.input}
            {...reg(name)}
            type={type} id={id} name={name} placeholder={id} />
        </div>
    )
}

export default Input