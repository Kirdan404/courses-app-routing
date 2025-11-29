import Button from "../../common/Button/Button";
import Logo from "./components/Logo/Logo";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout as logoutAction } from "../../store/user/userSlice";

type HeaderProps = {
  buttonText?: string;
  onLogout?: () => void;
};

const Header = ({ buttonText = "Logout", onLogout = () => {} }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useMemo(() => Boolean(localStorage.getItem("token") || user.isAuth || user.token), [user.isAuth, user.token]);
  const displayUserName = user.name || localStorage.getItem("user") || "";
  const displayButtonText = buttonText || "Logout";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    dispatch(logoutAction());
    onLogout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to={isAuth ? "/courses" : "/login"}>
          <Logo />
        </Link>
        {isAuth && (
          <div className="header__actions">
            {displayUserName && <span className="header__user">{displayUserName}</span>}
            <Button className="header__button" buttonText={displayButtonText} onClick={handleLogout} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
