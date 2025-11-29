import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import "./Courses.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAuthors } from "../../store/authors/authorsSlice";
import { fetchCourses } from "../../store/courses/coursesSlice";
import { selectAuthors, selectCourses } from "../../store/selectors";

type CoursesProps = {
    onShowCourse?: (courseId: string) => void;
    onAddCourseClick?: () => void;
};

const Courses = ({ onShowCourse = () => {}, onAddCourseClick }: CoursesProps) => {
    const dispatch = useAppDispatch();
    const courses = useAppSelector(selectCourses);
    const authors = useAppSelector(selectAuthors);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!courses.length) {
            dispatch(fetchCourses());
        }
        if (!authors.length) {
            dispatch(fetchAuthors());
        }
    }, [dispatch, courses.length, authors.length]);

    const authorsDictionary = useMemo(() => {
        const dictionary: Record<string, string> = {};

        authors.forEach((author) => {
            dictionary[author.id] = author.name;
        });

        return dictionary;
    }, [authors]);

    const resolveAuthorNames = (authorIds: string[]) =>
        authorIds
            .map((authorId) => authorsDictionary[authorId])
            .filter((name): name is string => Boolean(name));

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredCourses = useMemo(() => {
        if (!normalizedQuery) return courses;

        return courses.filter((course) => {
            const titleMatch = course.title.toLowerCase().includes(normalizedQuery);
            const idMatch = course.id.toLowerCase().includes(normalizedQuery);
            return titleMatch || idMatch;
        });
    }, [courses, normalizedQuery]);

    return (
        <section className="courses">
            <div className="courses__content">
                <div className="courses__toolbar">
                    <SearchBar onSearch={setSearchQuery} />
                    <Link to="/courses/add">
                        <Button
                            className="courses__add-button"
                            buttonText="Create course"
                            onClick={onAddCourseClick || (() => {})}
                        />
                    </Link>
                </div>

                <div className="courses__list">
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            title={course.title}
                            description={course.description}
                            duration={course.duration}
                            creationDate={course.creationDate}
                            authors={resolveAuthorNames(course.authors)}
                            allAuthors={authors}
                            onShow={() => onShowCourse(course.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
