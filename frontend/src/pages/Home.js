import style from "./Home.module.css"
import Logo from "../components/layout/Logo"
import Icon from "../components/common/icons"
import Main from "../components/layout/Main"

function Home(){
    return(
        <div className="page">
            <div className={style.head}>
                <Logo type='1'/>
                <Icon type='burge'/>
            </div>
            <div>
                <Main>
                <button>CRIAR EVENTO</button>
                <div></div>
                </Main>    
            </div>
        </div>
    )
}

export default Home