import { useMemo, useState } from "react";
import Button from "../../common/Button/Button";
import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import "./Courses.css";

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
    courses: Course[];
    authors: Author[];
    onShowCourse: (courseId: string) => void;
};

const Courses = ({ courses, authors, onShowCourse }: CoursesProps) => {
    const [searchQuery, setSearchQuery] = useState("");

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
                    <Button
                        className="courses__add-button"
                        buttonText="Add new course"
                        onClick={() => {}}
                    />
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
