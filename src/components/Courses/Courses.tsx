import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import { ADD_NEW_COURSE_BUTTON_TEXT, ROUTES } from "../../constants";
import { useAppSelector } from "../../store/hooks";
import { selectAuthors, selectCourses } from "../../store/selectors";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import "./Courses.css";

function Courses() {
    const navigate = useNavigate();
    const courses = useAppSelector(selectCourses);
    const authors = useAppSelector(selectAuthors);
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
                        onClick={() => navigate(ROUTES.CREATE_COURSE)}
                    />
                </div>

                <div className="courses__list">
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            authorsList={authors}
                            onShowCourse={(courseId) =>
                                navigate(
                                    ROUTES.COURSE_INFO.replace(
                                        ":courseId",
                                        courseId
                                    )
                                )
                            }
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Courses;
