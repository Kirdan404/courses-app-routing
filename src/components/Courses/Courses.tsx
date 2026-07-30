import { useState } from "react";
import Button from "../../common/Button/Button";
import {
    ADD_NEW_COURSE_BUTTON_TEXT,
    mockedAuthorsList,
    mockedCoursesList,
} from "../../constants";
import CreateCourse from "../CreateCourse/CreateCourse";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import "./Courses.css";

function Courses() {
    const [courses, setCourses] = useState(mockedCoursesList);
    const [isCreateCourseMode, setIsCreateCourseMode] =
        useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const filteredCourses = courses.filter((course) => {
        const title = course.title.toLowerCase();
        const id = course.id.toLowerCase();

        return (
            title.includes(normalizedSearchQuery) ||
            id.includes(normalizedSearchQuery)
        );
    });

    const changeMode = () => {
        setIsCreateCourseMode(!isCreateCourseMode);
    };

    if (isCreateCourseMode) {
        return <CreateCourse changeMode={changeMode} setCourses={setCourses} />;
    }

    return (
        <main className="courses">
            <div className="courses__content">
                <div className="courses__top-bar">
                    <SearchBar onSearch={setSearchQuery} />
                    <Button
                        buttonText={ADD_NEW_COURSE_BUTTON_TEXT}
                        onClick={changeMode}
                    />
                </div>

                <div className="courses__list">
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            authorsList={mockedAuthorsList}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Courses;
