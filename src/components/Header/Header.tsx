import Button from "../../common/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGOUT_BUTTON_TEXT } from "../../constants";
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
    const token = localStorage.getItem("token");
    const displayedUserName =
        userName ??
        localStorage.getItem("user") ??
        localStorage.getItem("userName") ??
        "";
    const isAuthenticationPage =
        location.pathname === "/login" || location.pathname === "/registration";

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
        onLogout?.();
        navigate("/login");
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
