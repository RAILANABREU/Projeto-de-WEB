import { eventos } from "../Datas"
import { Card } from "../components/common/Card"
import Head from "../components/layout/Head"
import Main from "../components/layout/Main"

function Home(){
    return(
        <div className="page">
            <Head type='home'/>
            <div>
                <Main>
                <button>CRIAR EVENTO</button>
                {eventos.map((item, index) =>{
                    return <Card key={index} eventos={item} foto={item.foto} titulo={item.titulo}/>
                })}
                </Main>    
            </div>
        </div>
    )
}

export default Home