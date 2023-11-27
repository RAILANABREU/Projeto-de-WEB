import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";
import Button from "../components/common/Button";
import Footer from "../components/layout/Footer"
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../useAuth";
import Tabela from "../components/common/Tabela";
import useData from "../useData";
import style from "./Pagemento.module.css"


export default function Pagamento(){
    useAuth();
    const {userId, eventoId} = useParams()
    const { userData, eventoData } = useData(userId,eventoId);
    const navigate = useNavigate()

    console.log(eventoData)
    return(
        <div className="page">
            <Head onIconClick={() => navigate(`/home/${userId}`)}/>
            <Main>
                <h1>{eventoData && eventoData.titulo.toUpperCase()}</h1>
                <div className={style.valores}>
                    <div className={style.valor}>TOTAL: {eventoData && eventoData.gastos.total}</div>
                    <div className={style.valor}>Custo Unitário: </div>
                </div>
                <div className="pix"/>
                <Tabela convidados={eventoData && eventoData.convidados}/>
                <Button type='confirmar' name='SALVAR'/>
            </Main>
            <Footer/>
        </div>
    )
}