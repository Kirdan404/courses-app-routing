import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import {
    ADD_NEW_COURSE_BUTTON_TEXT,
    mockedAuthorsList,
    mockedCoursesList,
} from "../../constants";
import type { Course } from "../../types/course";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import "./Courses.css";

type CoursesProps = Readonly<{
    courses?: Course[];
}>;

function Courses({ courses = mockedCoursesList }: CoursesProps) {
    const navigate = useNavigate();
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

    return (
        <main className="courses">
            <div className="courses__content">
                <div className="courses__top-bar">
                    <SearchBar onSearch={setSearchQuery} />
                    <Button
                        buttonText={ADD_NEW_COURSE_BUTTON_TEXT}
                        onClick={() => navigate("/courses/add")}
                    />
                </div>

                <div className="courses__list">
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            authorsList={mockedAuthorsList}
                            onShowCourse={(courseId) =>
                                navigate(`/courses/${courseId}`)
                            }
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Courses;
