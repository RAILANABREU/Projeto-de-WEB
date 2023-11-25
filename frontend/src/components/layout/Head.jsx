import style from "./Head.module.css";
import Logo from "./Logo";
import Icon from "../common/icons";

export default function Head({ type, onIconClick }) {
  return (
    <div className={type === 'home' ? style['head-home'] : style.head}>
      <Logo type='1' />
      <Icon type={type === 'home' ? 'burge' : 'home'} onClick={onIconClick} />
    </div>
  );
}