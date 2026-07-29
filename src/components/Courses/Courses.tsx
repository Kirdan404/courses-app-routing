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
                    <SearchBar />
                    <Button
                        buttonText={ADD_NEW_COURSE_BUTTON_TEXT}
                        onClick={changeMode}
                    />
                </div>

                <div className="courses__list">
                    {courses.map((course) => (
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
