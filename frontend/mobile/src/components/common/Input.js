
function Input({id, name, type}){
    return(
        <div>
            <label htmlFor={id}></label>
            <input type={type} id={id} name={name} placeholder={id} />
        </div>
    )
}

export default Input