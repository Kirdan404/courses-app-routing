import Button from "../../common/Button/Button";
import { ADD_NEW_COURSE_BUTTON_TEXT } from "../../constants";
import type { Author, Course } from "../../types/course";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import "./Courses.css";

type CoursesProps = Readonly<{
    courses: Course[];
    authorsList: Author[];
}>;

function Courses({ courses, authorsList }: CoursesProps) {
    return (
        <main className="courses">
            <div className="courses__content">
                <div className="courses__top-bar">
                    <SearchBar />
                    <Button buttonText={ADD_NEW_COURSE_BUTTON_TEXT} />
                </div>

                <div className="courses__list">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            authorsList={authorsList}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Courses;
