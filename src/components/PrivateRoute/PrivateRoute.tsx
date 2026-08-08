import { FC } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES, STORAGE_KEYS } from "../../constants";

const PrivateRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return token ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default PrivateRoute;
