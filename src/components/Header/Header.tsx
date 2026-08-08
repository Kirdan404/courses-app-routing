import Button from "../../common/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGOUT_BUTTON_TEXT, ROUTES, STORAGE_KEYS } from "../../constants";
import Logo from "./components/Logo/Logo";
import "./Header.css";

type HeaderProps = Readonly<{
    showUserActions?: boolean;
    userName?: string;
    onLogout?: () => void;
}>;

function Header({ showUserActions = true, userName, onLogout }: HeaderProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const displayedUserName =
        userName ?? localStorage.getItem(STORAGE_KEYS.USER_NAME) ?? "";
    const isAuthenticationPage =
        location.pathname === ROUTES.LOGIN ||
        location.pathname === ROUTES.REGISTRATION;

    function handleLogout() {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_NAME);
        onLogout?.();
        navigate(ROUTES.LOGIN);
    }

    return (
        <header className="header">
            <Logo />

            {showUserActions && token && !isAuthenticationPage && (
                <div className="header__actions">
                    <span className="header__user-name">
                        {displayedUserName}
                    </span>
                    <Button
                        buttonText={LOGOUT_BUTTON_TEXT}
                        onClick={handleLogout}
                    />
                </div>
            )}
        </header>
    );
}

export default Header;
