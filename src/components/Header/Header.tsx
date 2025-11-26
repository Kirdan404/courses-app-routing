import Button from "../../common/Button/Button";
import Logo from "./components/Logo/Logo";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

type HeaderProps = {
  buttonText?: string;
  userName?: string;
  onLogout?: () => void;
};

const Header = ({ buttonText = "Logout", userName = "", onLogout = () => {} }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useMemo(() => Boolean(localStorage.getItem("token")), []);
  const displayUserName = userName || localStorage.getItem("user") || "";
  const displayButtonText = buttonText || "Logout";
  const hideUserBlock =
    location.pathname === "/login" || location.pathname === "/registration";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    onLogout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to={isAuth ? "/courses" : "/login"}>
          <Logo />
        </Link>
        {!hideUserBlock && isAuth && (
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
