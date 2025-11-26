import { useMemo, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import EmptyCourseList from "./components/EmptyCourseList/EmptyCourseList";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import PrivateRoute from "./components/PrivateRoute";
import { logout, mockedAuthorsList, mockedCoursesList } from "./constants";

const AppContent = () => {
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [courses, setCourses] = useState(mockedCoursesList);
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") || ""
  );
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
    setAuthors((prev) => [...prev, author]);
  };

  const handleAddCourse = (course: {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
  }) => {
    setCourses((prev) => [...prev, course]);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUserName("");
  };

  const CoursesPage = () =>
    courses.length > 0 ? (
      <Courses
        courses={courses}
        authors={authors}
        onShowCourse={(courseId) => navigate(`/courses/${courseId}`)}
        onAddCourseClick={() => navigate("/courses/add")}
      />
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
      <Header buttonText={logout} onLogout={handleLogout} userName={userName} />
      <main>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={setUserName} />} />
          <Route path="/registration" element={<Registration onRegisterSuccess={setUserName} />} />
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
