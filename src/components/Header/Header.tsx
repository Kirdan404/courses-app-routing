import Button from "../../common/Button/Button";
import { LOGOUT_BUTTON_TEXT, USER_NAME_HARRY } from "../../constants";
import Logo from "./components/Logo/Logo";
import "./Header.css";

type HeaderProps = Readonly<{
    showUserActions?: boolean;
}>;

function Header({ showUserActions = true }: HeaderProps) {
    return (
        <header className="header">
            <Logo />

            {showUserActions && (
                <div className="header__actions">
                    <span className="header__user-name">{USER_NAME_HARRY}</span>
                    <Button buttonText={LOGOUT_BUTTON_TEXT} />
                </div>
            )}
        </header>
    );
}

export default Header;
