import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Registration from "./components/Registration/Registration";

function App() {
    return (
        <BrowserRouter>
            <Header showUserActions={Boolean(localStorage.getItem("token"))} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route
                    path="/courses"
                    element={
                        <PrivateRoute>
                            <Courses />
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
