import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
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
import { mockedCoursesList, ROUTES, STORAGE_KEYS } from "./constants";
import type { Course } from "./types/course";

type CreateCoursePageProps = Readonly<{
    setCourses: Dispatch<SetStateAction<Course[]>>;
}>;

function CreateCoursePage({ setCourses }: CreateCoursePageProps) {
    const navigate = useNavigate();

    return (
        <CreateCourse
            changeMode={() => navigate(ROUTES.COURSES)}
            setCourses={setCourses}
        />
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem(STORAGE_KEYS.TOKEN))
    );
    const [userName, setUserName] = useState(
        localStorage.getItem(STORAGE_KEYS.USER_NAME) ?? ""
    );
    const [courses, setCourses] = useState<Course[]>(mockedCoursesList);

    function handleLoginSuccess(name: string) {
        setIsAuthenticated(true);
        setUserName(name);
    }

    function handleLogout() {
        setIsAuthenticated(false);
        setUserName("");
    }

    return (
        <BrowserRouter>
            <Header
                showUserActions={isAuthenticated}
                userName={userName}
                onLogout={handleLogout}
            />
            <Routes>
                <Route
                    path={ROUTES.LOGIN}
                    element={<Login onLoginSuccess={handleLoginSuccess} />}
                />
                <Route path={ROUTES.REGISTRATION} element={<Registration />} />
                <Route
                    path={ROUTES.COURSES}
                    element={
                        <PrivateRoute>
                            <Courses courses={courses} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={ROUTES.CREATE_COURSE}
                    element={
                        <PrivateRoute>
                            <CreateCoursePage setCourses={setCourses} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={ROUTES.COURSE_INFO}
                    element={
                        <PrivateRoute>
                            <CourseInfo courses={courses} />
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
