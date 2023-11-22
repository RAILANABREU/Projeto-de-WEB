import style from "./Modal.module.css"
import Button from "./Button"
import { useEffect, useState } from "react";
import Perfil from "./Perfil";
import { FindUserByID } from '../../services/userServices';
import Logo from "../layout/Logo";

export default function ModalUser ({isOpen, setOpen, userId, authToken}){
    const [userData, setUserData] = useState(null);

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
    }, [isOpen, userId]);  

    if (isOpen){
        return(
            <div className={style.background}>
                <div className={style.modaluser}>
                    <Button onClick={setOpen}type="confirmar" name="X"/>
                    {userData && <Perfil img={userData.avatar} />}
                    <h2>{userData && userData.username}</h2>
                    <Button type="modal" name="Editar perfil"/>
                    {userData && 
                    <div>
                        <p className={style.p}>{userData.nome}</p>
                        <p className={style.p}>{userData.sobrenome}</p>
                        <p className={style.p}>{userData.telefone}</p>    
                    </div>
                    }
                    
                </div>
            </div>
        )
    }
    return null
} 