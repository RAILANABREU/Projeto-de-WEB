import styles from "./Card.module.css"

export function Card({key, eventos, foto, titulo}){
    const fotoURL = foto;
    return(
        <div className={styles.card}>
            <div className={styles.background} style={{ backgroundImage: `url(${fotoURL})`}}/>
            <div className={styles.glass}/>
            <h1 className={styles.titulo}>{titulo}</h1>
        </div>        
    )
}