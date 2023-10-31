import Logo from "../components/layout/Logo"
import Icon from "../components/common/icons"
import style from "./Criarevento.module.css"
import Main from "../components/layout/Main"
import Input from "../components/common/Input"

function CriarEvento(){
    return(
        <div className="page">
            <div className={style.head}>
                <Logo type={1}/>
                <Icon type='home'/>
            </div>
            <div>
                <Main>
                    <h1>CRIAR EVENTO</h1>
                    <Icon type = 'foto-evento'/>

                    <Input id='título' name='titulo' type = 'text'/>
                    <Input id= 'descrição' name= 'descricao' type= 'text'/>
                    <Input id= 'chave pix' name= 'pix' type= 'text'/>
                    <button className={style.add}> + Gasto</button>
                    

                    <div className={style['button-box']}>
                        <button className={style.cancelar}>CANCELAR</button>
                        <button className={style.criar}>CRIAR</button>
                    </div>
                </Main>
            </div>
        </div>
    )
}
export default CriarEvento