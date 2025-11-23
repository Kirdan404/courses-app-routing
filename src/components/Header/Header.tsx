import Button from "../../common/Button/Button";
import Logo from "./components/Logo/Logo";
import "./Header.css";

type HeaderProps = {
  buttonText: string;
  userName: string;
  onButtonClick: () => void;
};

const Header = (props: HeaderProps) => (
  <header className="header">
    <div className="header__inner">
      <Logo />
      <div className="header__actions">
        {props.userName && <span className="header__user">{props.userName}</span>}
        <Button
          className="header__button"
          buttonText={props.buttonText}
          onClick={props.onButtonClick}
        />
      </div>
    </div>
  </header>
);

export default Header;
