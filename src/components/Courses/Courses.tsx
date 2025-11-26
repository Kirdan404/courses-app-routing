import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import "./Courses.css";
import { mockedAuthorsList, mockedCoursesList } from "../../constants";

type Author = {
    id: string;
    name: string;
};

type Course = {
    id: string;
    title: string;
    description: string;
    duration: number | string;
    creationDate: string;
    authors: string[];
};

type CoursesProps = {
    courses?: Course[];
    authors?: Author[];
    onShowCourse?: (courseId: string) => void;
    onAddCourseClick?: () => void;
};

const Courses = ({
    courses = mockedCoursesList,
    authors = mockedAuthorsList,
    onShowCourse = () => {},
    onAddCourseClick,
}: CoursesProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const effectiveCourses = (courses && courses.length ? courses : mockedCoursesList) || [];
    const effectiveAuthors = (authors && authors.length ? authors : mockedAuthorsList) || [];

    const authorsDictionary = useMemo(() => {
        const dictionary: Record<string, string> = {};

        (effectiveAuthors || []).forEach((author) => {
            dictionary[author.id] = author.name;
        });

        return dictionary;
    }, [effectiveAuthors]);

    const resolveAuthorNames = (authorIds: string[]) =>
        authorIds
            .map((authorId) => authorsDictionary[authorId])
            .filter((name): name is string => Boolean(name));

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredCourses = useMemo(() => {
        if (!normalizedQuery) return effectiveCourses;

        return effectiveCourses.filter((course) => {
            const titleMatch = course.title.toLowerCase().includes(normalizedQuery);
            const idMatch = course.id.toLowerCase().includes(normalizedQuery);
            return titleMatch || idMatch;
        });
    }, [effectiveCourses, normalizedQuery]);

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
