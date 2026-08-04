import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Courses from "./components/Courses/Courses";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Registration from "./components/Registration/Registration";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem("token"))
    );

    return (
        <BrowserRouter>
            <Header showUserActions={isAuthenticated} />
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Login
                            onLoginSuccess={() => setIsAuthenticated(true)}
                        />
                    }
                />
                <Route path="/registration" element={<Registration />} />
                <Route
                    path="/courses"
                    element={
                        <PrivateRoute>
                            <Courses />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/courses/:courseId"
                    element={
                        <PrivateRoute>
                            <CourseInfo />
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
