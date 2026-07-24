import { mockedAuthorsList, mockedCoursesList } from "./constants";
import Header from "./components/Header/Header";
import EmptyCourseList from "./components/EmptyCourseList/EmptyCourseList";
import Courses from "./components/Courses/Courses";

function App() {
    return (
        <>
            <Header />
            {mockedCoursesList.length > 0 ? (
                <Courses
                    courses={mockedCoursesList}
                    authorsList={mockedAuthorsList}
                />
            ) : (
                <EmptyCourseList />
            )}
        </>
    );
}

export default App;
