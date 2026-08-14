import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Courses from "./components/Courses/Courses";
import CourseForm from "./components/CourseForm/CourseForm";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Registration from "./components/Registration/Registration";
import { ADMIN_ROLE, ROUTES } from "./constants";
import { fetchAuthors } from "./store/authors/thunk";
import { fetchCourses } from "./store/courses/thunk";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectUser } from "./store/selectors";
import { fetchCurrentUser } from "./store/user/thunk";

function CourseFormPage() {
    const navigate = useNavigate();

    return <CourseForm changeMode={() => navigate(ROUTES.COURSES)} />;
}

type DataRouteProps = Readonly<{
    children: ReactNode;
    isLoading: boolean;
}>;

function DataRoute({ children, isLoading }: DataRouteProps) {
    return (
        <PrivateRoute>
            {isLoading ? (
                <main>
                    <output>Loading...</output>
                </main>
            ) : (
                children
            )}
        </PrivateRoute>
    );
}

function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [loadedDataToken, setLoadedDataToken] = useState("");

    useEffect(() => {
        if (!user.isAuth) {
            return;
        }

        let isActive = true;

        void Promise.all([
            dispatch(fetchCourses()),
            dispatch(fetchAuthors()),
            dispatch(fetchCurrentUser(user.token)),
        ]).then(() => {
            if (isActive) {
                setLoadedDataToken(user.token);
            }
        });

        return () => {
            isActive = false;
        };
    }, [dispatch, user.isAuth, user.token]);

    const isDataLoading = user.isAuth && loadedDataToken !== user.token;

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path={ROUTES.LOGIN}
                    element={
                        user.isAuth ? (
                            <Navigate to={ROUTES.COURSES} replace />
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path={ROUTES.REGISTRATION}
                    element={
                        user.isAuth ? (
                            <Navigate to={ROUTES.COURSES} replace />
                        ) : (
                            <Registration />
                        )
                    }
                />
                <Route
                    path={ROUTES.COURSES}
                    element={
                        <DataRoute isLoading={isDataLoading}>
                            <Courses />
                        </DataRoute>
                    }
                />
                <Route
                    path={ROUTES.CREATE_COURSE}
                    element={
                        <DataRoute isLoading={isDataLoading}>
                            {user.role === ADMIN_ROLE ? (
                                <CourseFormPage />
                            ) : (
                                <Navigate to={ROUTES.COURSES} replace />
                            )}
                        </DataRoute>
                    }
                />
                <Route
                    path={ROUTES.COURSE_INFO}
                    element={
                        <DataRoute isLoading={isDataLoading}>
                            <CourseInfo />
                        </DataRoute>
                    }
                />
                <Route
                    path={ROUTES.HOME}
                    element={<Navigate to={ROUTES.COURSES} replace />}
                />
                <Route
                    path={ROUTES.NOT_FOUND}
                    element={<Navigate to={ROUTES.COURSES} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
