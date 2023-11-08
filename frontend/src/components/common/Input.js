import style from "./Input.module.css"

function Input({id, name, register, type}){
    return(
        <div>
            <label htmlFor={id}></label>
            <input className={style.input}
            {...register(name)}
            type={type} id={id} name={name} placeholder={id} />
        </div>
    )
}

export default Input