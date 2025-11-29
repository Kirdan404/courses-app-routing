import { useEffect, useMemo } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import EmptyCourseList from "./components/EmptyCourseList/EmptyCourseList";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { logout } from "./constants";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchAuthors, addAuthor as addAuthorAction } from "./store/authors/authorsSlice";
import { addCourse as addCourseAction, fetchCourses } from "./store/courses/coursesSlice";
import { logout as logoutUser, setUser } from "./store/user/userSlice";
import { selectAuthors, selectCourses, selectUser } from "./store/selectors";

const AppContent = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector(selectAuthors);
  const courses = useAppSelector(selectCourses);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const authorsDictionary = useMemo(() => {
    const dictionary: Record<string, string> = {};
    authors.forEach((author) => {
      dictionary[author.id] = author.name;
    });
    return dictionary;
  }, [authors]);

  const resolveAuthorNames = (authorIds: string[]) =>
    authorIds
      .map((authorId) => authorsDictionary[authorId])
      .filter((name): name is string => Boolean(name));

  const handleAddAuthor = (author: { id: string; name: string }) => {
    dispatch(addAuthorAction(author));
  };

  const handleAddCourse = (course: {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
  }) => {
    dispatch(addCourseAction(course));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (user.token) {
      if (!authors.length) dispatch(fetchAuthors());
      if (!courses.length) dispatch(fetchCourses());
    }
  }, [user.token, dispatch, authors.length, courses.length]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/courses", { replace: true });
    }
  }, [navigate]);

  const CoursesPage = () =>
    courses.length > 0 ? (
      <Courses onShowCourse={(courseId) => navigate(`/courses/${courseId}`)} onAddCourseClick={() => navigate("/courses/add")} />
    ) : (
      <EmptyCourseList />
    );

  const CourseInfoPage = () => {
    const { courseId } = useParams();
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return <Navigate to="/courses" replace />;
    }
    return (
      <CourseInfo
        id={course.id}
        title={course.title}
        description={course.description}
        duration={course.duration}
        creationDate={course.creationDate}
        authors={resolveAuthorNames(course.authors)}
        onBack={() => navigate("/courses")}
      />
    );
  };

  const CreateCoursePage = () => (
    <CreateCourse
      authors={authors}
      onAddAuthor={handleAddAuthor}
      onAddCourse={(course) => {
        handleAddCourse(course);
        navigate("/courses");
      }}
      onCancel={() => navigate("/courses")}
    />
  );

  const isAuth = Boolean(localStorage.getItem("token"));

  return (
    <>
      <Header buttonText={logout} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                onLoginSuccess={(name) =>
                  dispatch(setUser({ name, email: "", token: localStorage.getItem("token") || "" }))
                }
              />
            }
          />
          <Route path="/registration" element={<Registration onRegisterSuccess={() => {}} />} />
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <CoursesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/add"
            element={
              <PrivateRoute>
                <CreateCoursePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <PrivateRoute>
                <CourseInfoPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to={isAuth ? "/courses" : "/login"} replace />} />
          <Route path="*" element={<Navigate to={isAuth ? "/courses" : "/login"} replace />} />
        </Routes>
      </main>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
