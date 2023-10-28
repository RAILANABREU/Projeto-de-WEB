import styles from './Main.module.css'

function Main(props){
    return(
        <div className={styles.main}>{props.children}</div>
    )
}
export default Main