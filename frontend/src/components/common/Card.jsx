import styles from "./Card.module.css"

export function Card({foto, titulo}){
    const fotoURL = foto;
    return(
        <div className={styles.card}>
            <div className={styles.background} style={{ backgroundImage: `url(${fotoURL})`}}/>
            <h1 className={styles.titulo}>{titulo}</h1>
        </div>        
    )
}