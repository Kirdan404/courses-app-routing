import { FC } from "react";
import { Navigate } from "react-router-dom";
import { ADMIN_ROLE, ROUTES } from "../../constants";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";

const PrivateRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
    const user = useAppSelector(selectUser);

    return user.role === ADMIN_ROLE ? (
        <>{children}</>
    ) : (
        <Navigate to={ROUTES.COURSES} replace />
    );
};

export default PrivateRoute;
