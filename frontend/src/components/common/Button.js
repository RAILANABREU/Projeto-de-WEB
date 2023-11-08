import style from "./Button.module.css"
import Icon from "./icons"

export default function Button({ type, name, name2, onClick }) {
    let buttonContent;
  
    switch (type) {
      case 'cancelar':
        buttonContent = <button className={style.cancelar}>{name}</button>;
        break;
      case 'confirmar':
        buttonContent = <button className={style.criar} onClick={onClick} >{name}</button>;
        break;
      case 'cancelar/confirmar':
        buttonContent = (
          <div className={style['button-box']}>
            <button className={style.cancelar}>{name}</button>
            <button className={style.criar}>{name2}</button>
          </div>
        );
        break;
      case 'add':
        buttonContent = <button className={style.add}> + Gasto</button>;
        break;
      case 'convite':
        buttonContent = (
          <button className={style.convite} onClick={onClick}>
            CONVITE
            <Icon type='copy' />
          </button>
        );
        break;
      default:
        buttonContent = null; // Lida com tipos desconhecidos ou não especificados.
    }
  
    return buttonContent;
  }
  