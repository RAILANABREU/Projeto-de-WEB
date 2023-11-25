import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";
import Button from "../components/common/Button";
import Footer from "../components/layout/Footer"
import { useNavigate, useParams } from "react-router-dom";


export default function Pagamento(){
    const {userId, eventoId} = useParams()
    const navigate = useNavigate()
    return(
        <div className="page">
            <Head onIconClick={() => navigate(`/home/${userId}`)}/>
            <Main>
                <h1>LISTA DE PAGAMENTO</h1>
                <div className="valor-total"/>
                <div className="pix"/>
                <Button type='confirmar' name='SALVAR'/>
            </Main>
            <Footer/>
        </div>
    )
}