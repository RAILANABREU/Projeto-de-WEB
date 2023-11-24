import style from "./Button.module.css"
import Icon from "./icons"

export default function Button({ type, name, name2, onClickCancelar, onClick }) {
    let buttonContent;
  
    switch (type) {
      case 'cancelar':
        buttonContent = <button className={style.cancelar} onClick={onClickCancelar}>{name}</button>;
        break;
      case 'confirmar':
        buttonContent = <button className={style.criar} onClick={onClick}>{name}</button>;
        break;
      case 'cancelar/confirmar':
        buttonContent = (
          <div className={style['button-box']}>
            <button className={style.cancelar} onClick={onClickCancelar}>{name}</button>
            <button type="submit" className={style.criar} onClick={onClick}>{name2}</button>
          </div>
        );
        break;
      case 'add':
        buttonContent = <button className={style.add}> + Gasto</button>;
        break;
      case 'convite':
        buttonContent = (
          <button className={style.convite}>
            CONVITE
            <Icon type='copy' />
          </button>
        );
        break;
        case 'modal':
          buttonContent = (
            <button className={style.modal}>
              {name}
            </button>
          );
          break;
      default:
        buttonContent = null;
    }
  
    return buttonContent;
  }
  