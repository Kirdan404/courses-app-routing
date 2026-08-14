import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import {
    ADD_NEW_COURSE_BUTTON_TEXT,
    ADMIN_ROLE,
    ROUTES,
} from "../../constants";
import { useAppSelector } from "../../store/hooks";
import {
    selectAuthors,
    selectCourses,
    selectUser,
} from "../../store/selectors";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import "./Courses.css";

function Courses() {
    const navigate = useNavigate();
    const courses = useAppSelector(selectCourses);
    const authors = useAppSelector(selectAuthors);
    const user = useAppSelector(selectUser);
    const [searchQuery, setSearchQuery] = useState("");
    const navigateToCreateCourse = () => navigate(ROUTES.CREATE_COURSE);

    if (courses.length === 0) {
        return (
            <EmptyCourseList
                onAddCourse={
                    user.role === ADMIN_ROLE
                        ? navigateToCreateCourse
                        : undefined
                }
            />
        );
    }

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
                    {user.role === ADMIN_ROLE && (
                        <Button
                            buttonText={ADD_NEW_COURSE_BUTTON_TEXT}
                            onClick={navigateToCreateCourse}
                        />
                    )}
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
