import Button from "../../common/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGOUT_BUTTON_TEXT, ROUTES, STORAGE_KEYS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";
import { removeUser } from "../../store/user/userSlice";
import Logo from "./components/Logo/Logo";
import "./Header.css";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const isAuthenticationPage =
        location.pathname === ROUTES.LOGIN ||
        location.pathname === ROUTES.REGISTRATION;

    function handleLogout() {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_NAME);
        dispatch(removeUser());
        navigate(ROUTES.LOGIN);
    }

    return (
        <header className="header">
            <Logo />

            {user.isAuth && !isAuthenticationPage && (
                <div className="header__actions">
                    <span className="header__user-name">{user.name}</span>
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
