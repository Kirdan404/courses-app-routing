import Button from "../../common/Button/Button";
import { LOGOUT_BUTTON_TEXT, USER_NAME_HARRY } from "../../constants";
import Logo from "./components/Logo/Logo";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <Logo />

            <div className="header__actions">
                <span className="header__user-name">{USER_NAME_HARRY}</span>
                <Button buttonText={LOGOUT_BUTTON_TEXT} />
            </div>
        </header>
    );
}

export default Header;
