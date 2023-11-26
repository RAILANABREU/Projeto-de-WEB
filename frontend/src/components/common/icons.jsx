import burge from "../../assets/hamburger-icon.png";
import homeicon from "../../assets/home-icon.png";
import fotoevento from "../../assets/foto-evento.png";
import fotocomprovante from "../../assets/foto-comprovante.png";
import copia from "../../assets/copy-icon.png";
import style from "../Img.module.css";
import convite from "../../assets/convite.png";

export default function Icon({type, onClick, img}){
    if(img){
        return (
        <img className={style.image} src={img} alt={`imagem de ${type}`} onClick={onClick}/>)
    }
    else{
        return (
            <img
                className={
                type === 'burge'
                    ? style.burge
                    : type === 'home'
                    ? style.homeicon
                    : type === 'copy'
                    ? style.copy
                    : type === 'convite'
                    ? style.convite 
                    : style.image
                }
                src={
                type === 'burge'
                    ? burge
                    : type === 'home'
                    ? homeicon
                    : type === 'foto-evento'
                    ? fotoevento
                    : type === 'foto-comprovante'
                    ? fotocomprovante
                    : type === 'copy'
                    ? copia
                    : type === 'convite'
                    ? convite
                    : ""
                }
                alt={`ícone de ${type}`}
                onClick={onClick}
            />
        );
    }
}