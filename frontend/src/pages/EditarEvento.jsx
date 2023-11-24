import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";

export default function EditarEvento(){
    const {userId, eventoId} = useParams()
    const navigate = useNavigate()
    return(
        <div className="page">
            <Head onIconClick={() => navigate(`/home/${userId}`)}/>
            <Main>
            <h1>EDITAR EVENTO</h1>
            </Main>
        </div>
    )
}