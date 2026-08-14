import Button from "../../../../common/Button/Button";
import deleteIcon from "../../../../assets/images/delete.png";
import editIcon from "../../../../assets/images/edit.png";
import { SHOW_COURSE_BUTTON_TEXT } from "../../../../constants";
import formatCreationDate from "../../../../helpers/formatCreationDate";
import getCourseAuthors from "../../../../helpers/getCourseAuthors";
import getCourseDuration from "../../../../helpers/getCourseDuration";
import { deleteCourse } from "../../../../store/courses/coursesSlice";
import { useAppDispatch } from "../../../../store/hooks";
import type { Author, Course } from "../../../../types/course";
import "./CourseCard.css";

type CourseCardProps = Readonly<{
    course: Course;
    authorsList: Author[];
    onShowCourse?: (courseId: string) => void;
}>;

function CourseCard({ course, authorsList, onShowCourse }: CourseCardProps) {
    const dispatch = useAppDispatch();
    const authorsNames = getCourseAuthors(course.authors, authorsList);

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

                <div className="course-card__actions">
                    <Button
                        buttonText={SHOW_COURSE_BUTTON_TEXT}
                        onClick={() => onShowCourse?.(course.id)}
                    />
                    <Button
                        ariaLabel="Delete course"
                        buttonText={
                            <img
                                alt=""
                                className="course-card__action-icon"
                                src={deleteIcon}
                            />
                        }
                        className="course-card__icon-button"
                        onClick={() => dispatch(deleteCourse(course.id))}
                    />
                    <Button
                        ariaLabel="Update course"
                        buttonText={
                            <img
                                alt=""
                                className="course-card__action-icon"
                                src={editIcon}
                            />
                        }
                        className="course-card__icon-button"
                    />
                </div>
            </div>
        </article>
    );
}

export default CourseCard;
