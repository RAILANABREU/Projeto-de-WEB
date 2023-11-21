import Logo from "../components/layout/Logo"
import style from "./Principal.module.css"
import Main from "../components/layout/Main"
import Footer from "../components/layout/Footer"

export default function Principal(){
    return(
        <div className="page">
            <div className={style.head}>
            <Logo type= '3'/>
            </div>
            <Main>
                <h3>Bem-vindo ao <b>BILLBUDDY</b>,</h3>
                <p className={style.p}>o seu aplicativo para tornar a organização dos seus eventos ainda mais fácil.</p>
                <button>ENTRAR</button>
                <button>CRIAR CONTA</button>
            </Main>
            <Footer/>
        </div>
    )
}