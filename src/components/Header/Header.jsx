import headerSvg from "src/img/header.svg";
import "./style.scss";

const Header = (props) => {
  return (
    <div className="header">
      <img src={headerSvg} alt="Логотип больницы" className="header-logo" />
      <div className="header__block">
        <h1 className="header__title text-style">{props.title}</h1>
        {props.children}
      </div>
    </div>
  );
};

export default Header;
