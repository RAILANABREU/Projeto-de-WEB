import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/layout/Head";
import Main from "../components/layout/Main";
import Icon from "../components/common/icons";
import style from "./Convite.module.css";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Convite(){
    const {userId, eventoId} = useParams();
    const navigate  = useNavigate();

    return(
        <div className="page">
            <Head onIconClick={() => navigate(`/home/${userId}`)}/>
            <Main>
                <div className={style.top}>
                    <h1>CONVITE</h1>
                    <Icon type={"convite"}/>
                    <input/>
                </div>
                 
                <Button 
                    type='cancelar/confirmar' 
                    name='CANCELAR' 
                    name2='ENVIAR' 
                    onClickCancelar={() => navigate(`/home/${userId}`)}
                />
            </Main>
        </div>
    )
}