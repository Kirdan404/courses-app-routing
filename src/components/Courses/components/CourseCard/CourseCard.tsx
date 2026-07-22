import Button from "../../../../common/Button/Button";
import { SHOW_COURSE_BUTTON_TEXT } from "../../../../constants";
import { formatCreationDate } from "../../../../helpers/formatCreationDate";
import { getCourseDuration } from "../../../../helpers/getCourseDuration";
import "./CourseCard.css";

type Course = {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
};

type CourseCardProps = {
    course: Course;
    authorsList: Author[];
};

type Author = {
    id: string;
    name: string;
};

function CourseCard({ course, authorsList }: CourseCardProps) {
    const courseAuthors = course.authors.map((authorId) => {
        return authorsList.find((author) => author.id === authorId);
    });

    const authorsNames = courseAuthors.map((author) => author?.name).join(", ");

    return (
        <article className="course-card">
            <div className="course-card__content">
                <h2 className="course-card__title">{course.title}</h2>
                <p className="course-card__description">{course.description}</p>
            </div>

            <div className="course-card__info">
                <p className="course-card__info-row">
                    <strong>Authors:</strong>
                    <span className="course-card__authors">{authorsNames}</span>
                </p>
                <p className="course-card__info-row">
                    <strong>Duration:</strong> {getCourseDuration(course.duration)}
                </p>
                <p className="course-card__info-row">
                    <strong>Created:</strong> {formatCreationDate(course.creationDate)}
                </p>

                <Button buttonText={SHOW_COURSE_BUTTON_TEXT} />
            </div>
        </article>
    );
}

export default CourseCard;
