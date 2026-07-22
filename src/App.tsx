import { mockedAuthorsList, mockedCoursesList } from "./constants";
import Header from "./components/Header/Header";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import EmptyCourseList from "./components/EmptyCourseList/EmptyCourseList";

function App() {
    return (
        <>
            <Header />
            {mockedCoursesList.length > 0 ? (
                <CourseInfo course={mockedCoursesList[0]} authorsList={mockedAuthorsList} />
            ) : (
                <EmptyCourseList />
            )}
        </>
    );
}

export default App;
