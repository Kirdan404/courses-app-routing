import { mockedCoursesList } from "./constants";
import Header from "./components/Header/Header";
import EmptyCourseList from "./components/EmptyCourseList/EmptyCourseList";

function App() {
    return (
        <>
            <Header />
            {/* {mockedCoursesList.length === 0 && <EmptyCourseList />} */}
            <EmptyCourseList />
        </>
    );
}

export default App;
