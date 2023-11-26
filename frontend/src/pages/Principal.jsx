import Logo from "../components/layout/Logo"
import style from "./Principal.module.css"
import Main from "../components/layout/Main"
import Footer from "../components/layout/Footer"
import { Link } from 'react-router-dom';

export default function Principal(){
    
    return(
        <div className="page">
            <div className="main-container main-distance"> 
                <div className={style.head}>
                    <Logo type= '3'/>
                </div>
                <Main> 
                    <h3>Bem-vindo ao <b>BILLBUDDY</b></h3>
                    <p className={style.p}>O seu aplicativo para tornar a organização dos seus eventos ainda mais fácil.</p>
                    <Link to="/signin">
                        <button>ENTRAR</button>
                    </Link>
                    <Link to="/signup">
                        <button>CRIAR CONTA</button>
                    </Link>
                </Main>
            </div>
            
            <Footer/>
        </div>
    )
}