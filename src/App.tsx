import { useState } from "react";
import Header from "./components/Header/Header";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import Courses from "./components/Courses/Courses";
import { mockedAuthorsList, mockedCoursesList } from "./constants";
import type { Author, Course } from "./types/course";

function App() {
    const [courses, setCourses] = useState<Course[]>(mockedCoursesList);
    const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);
    const [isCreatingCourse, setIsCreatingCourse] = useState(true);

    function handleCreateAuthor(author: Author) {
        setAuthors((currentAuthors) => [...currentAuthors, author]);
    }

    function handleDeleteAuthor(authorId: string) {
        setAuthors((currentAuthors) =>
            currentAuthors.filter((author) => author.id !== authorId)
        );
    }

    function handleCreateCourse(course: Course) {
        setCourses((currentCourses) => [...currentCourses, course]);
        setIsCreatingCourse(false);
    }

    return (
        <>
            <Header />
            {isCreatingCourse ? (
                <CreateCourse
                    authorsList={authors}
                    onCancel={() => setIsCreatingCourse(false)}
                    onCreateAuthor={handleCreateAuthor}
                    onCreateCourse={handleCreateCourse}
                    onDeleteAuthor={handleDeleteAuthor}
                />
            ) : (
                <Courses courses={courses} authorsList={authors} />
            )}
        </>
    );
}

export default App;
