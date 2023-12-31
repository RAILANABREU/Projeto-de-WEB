import style from "./Modal.module.css"
import Button from "./Button"
import { useEffect, useState } from "react";
import Perfil from "./Perfil";
import { FindUserByID } from '../../services/userServices';
import Logo from "../layout/Logo";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ModalUser ({isOpen, setOpen, userId, authToken}){
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userFound = await FindUserByID(userId, authToken);
            setUserData(userFound);
          } catch (error) {
            console.error('Erro ao buscar informações do usuário:', error);
          }
        };
    
    if (isOpen && userId) {
        fetchUserData();
        }
    }, [isOpen]);

    const userLogout = () =>{
        Cookies.remove("token");
        navigate("/signin");
    }
    if (isOpen){
        return(
            <div className={style.background}>
                <div className={style.modaluser}>
                    <div className={style.top}>
                        <button className={style.close}onClick={() => setOpen(false)}>X</button>
                        <Button type="sair" name="sair" onClick={userLogout}/>
                    </div>
                    {userData && <Perfil img={userData.avatar} />}
                    <h2>{userData && userData.username}</h2>
                    <Link style={{width: "100%"}}
                    to={`/editarperfil/${userId}`}><Button type="modal" name="Editar perfil"/></Link>
                    {userData && 
                    <div>
                        <p className={style.p}>{userData.nome}</p>
                        <p className={style.p}>{userData.sobrenome}</p>
                        <p className={style.p}>{userData.telefone}</p>    
                    </div>
                    }
                    <div className={style.logo}>
                    <Logo type="logo-branca"/></div>
                </div>
            </div>
        )
    }
    return null
} 