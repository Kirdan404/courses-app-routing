import { useNavigate } from "react-router-dom";
import Button from "../../../../common/Button/Button";
import deleteIcon from "../../../../assets/images/delete.png";
import editIcon from "../../../../assets/images/edit.png";
import {
    ADMIN_ROLE,
    ROUTES,
    SHOW_COURSE_BUTTON_TEXT,
} from "../../../../constants";
import formatCreationDate from "../../../../helpers/formatCreationDate";
import getCourseAuthors from "../../../../helpers/getCourseAuthors";
import getCourseDuration from "../../../../helpers/getCourseDuration";
import { deleteCourse } from "../../../../store/courses/thunk";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectUser } from "../../../../store/selectors";
import type { Author, Course } from "../../../../types/course";
import "./CourseCard.css";

type CourseCardProps = Readonly<{
    course: Course;
    authorsList: Author[];
    onShowCourse?: (courseId: string) => void;
}>;

function CourseCard({ course, authorsList, onShowCourse }: CourseCardProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const authorsNames = getCourseAuthors(course.authors, authorsList);
    const isAdmin = user.role === ADMIN_ROLE;

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
                    {isAdmin && (
                        <>
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
                                onClick={() =>
                                    dispatch(
                                        deleteCourse({
                                            courseId: course.id,
                                            token: user.token,
                                        })
                                    )
                                }
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
                                onClick={() =>
                                    navigate(
                                        ROUTES.UPDATE_COURSE.replace(
                                            ":courseId",
                                            course.id
                                        )
                                    )
                                }
                            />
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}

export default CourseCard;
