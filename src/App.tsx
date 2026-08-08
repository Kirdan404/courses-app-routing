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
import { mockedCoursesList } from "./constants";
import type { Course } from "./types/course";

type CreateCoursePageProps = Readonly<{
    setCourses: Dispatch<SetStateAction<Course[]>>;
}>;

function CreateCoursePage({ setCourses }: CreateCoursePageProps) {
    const navigate = useNavigate();

    return (
        <CreateCourse
            changeMode={() => navigate("/courses")}
            setCourses={setCourses}
        />
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem("token"))
    );
    const [userName, setUserName] = useState(
        localStorage.getItem("user") ?? ""
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
                    path="/login"
                    element={<Login onLoginSuccess={handleLoginSuccess} />}
                />
                <Route path="/registration" element={<Registration />} />
                <Route
                    path="/courses"
                    element={
                        <PrivateRoute>
                            <Courses courses={courses} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/courses/add"
                    element={
                        <PrivateRoute>
                            <CreateCoursePage setCourses={setCourses} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/courses/:courseId"
                    element={
                        <PrivateRoute>
                            <CourseInfo courses={courses} />
                        </PrivateRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/courses" replace />} />
                <Route path="*" element={<Navigate to="/courses" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
