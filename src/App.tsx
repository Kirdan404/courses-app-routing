import { useEffect } from "react";
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
import CreateCourse from "./components/CreateCourse/CreateCourse";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Registration from "./components/Registration/Registration";
import { ROUTES } from "./constants";
import { fetchAuthors } from "./store/authors/authorsSlice";
import { fetchCourses } from "./store/courses/coursesSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectUser } from "./store/selectors";

function CreateCoursePage() {
    const navigate = useNavigate();

    return <CreateCourse changeMode={() => navigate(ROUTES.COURSES)} />;
}

function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (user.isAuth) {
            void dispatch(fetchCourses());
            void dispatch(fetchAuthors());
        }
    }, [dispatch, user.isAuth]);

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
                        <PrivateRoute>
                            <Courses />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={ROUTES.CREATE_COURSE}
                    element={
                        <PrivateRoute>
                            <CreateCoursePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={ROUTES.COURSE_INFO}
                    element={
                        <PrivateRoute>
                            <CourseInfo />
                        </PrivateRoute>
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
