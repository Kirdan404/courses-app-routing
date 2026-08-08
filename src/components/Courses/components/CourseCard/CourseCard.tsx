import Button from "../../../../common/Button/Button";
import { SHOW_COURSE_BUTTON_TEXT } from "../../../../constants";
import formatCreationDate from "../../../../helpers/formatCreationDate";
import getCourseDuration from "../../../../helpers/getCourseDuration";
import type { Author, Course } from "../../../../types/course";
import "./CourseCard.css";

type CourseCardProps = Readonly<{
    course: Course;
    authorsList: Author[];
    onShowCourse?: (courseId: string) => void;
}>;

function CourseCard({ course, authorsList, onShowCourse }: CourseCardProps) {
    const authorsNames = course.authors.map((authorId) => {
        const author = authorsList.find((author) => author.id === authorId);

        return author ? author.name : authorId;
    });

    return (
        <article className="course-card">
            <div className="course-card__content">
                <h2 className="course-card__title">{course.title}</h2>
                <p className="course-card__description">{course.description}</p>
            </div>

            <div className="course-card__info">
                <p className="course-card__info-row">
                    <strong>Authors:</strong>
                    <span className="course-card__authors">
                        {authorsNames.join(", ")}
                    </span>
                </p>
                <p className="course-card__info-row">
                    <strong>Duration:</strong>{" "}
                    {getCourseDuration(course.duration)}
                </p>
                <p className="course-card__info-row">
                    <strong>Created:</strong>{" "}
                    {formatCreationDate(course.creationDate)}
                </p>

                <Button
                    buttonText={SHOW_COURSE_BUTTON_TEXT}
                    onClick={() => onShowCourse?.(course.id)}
                />
            </div>
        </article>
    );
}

export default CourseCard;
