import Head from "../components/layout/Head"
import Main from "../components/layout/Main"

function Home(){
    return(
        <div className="page">
            <Head type='home'/>
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