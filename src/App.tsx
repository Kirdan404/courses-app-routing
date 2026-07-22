import { mockedAuthorsList, mockedCoursesList } from "./constants";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import EmptyCourseList from "./components/EmptyCourseList/EmptyCourseList";

function App() {
    return (
        <>
            <Header />
            {mockedCoursesList.length > 0 ? (
                <Courses courses={mockedCoursesList} authorsList={mockedAuthorsList} />
            ) : (
                <EmptyCourseList />
            )}
        </>
    );
}

export default App;
