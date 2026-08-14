import { Link, Navigate, useParams } from "react-router-dom";
import { BACK_BUTTON_TEXT, ROUTES } from "../../constants";
import formatCreationDate from "../../helpers/formatCreationDate";
import getCourseAuthors from "../../helpers/getCourseAuthors";
import getCourseDuration from "../../helpers/getCourseDuration";
import { useAppSelector } from "../../store/hooks";
import { selectAuthors, selectCourses } from "../../store/selectors";
import "./CourseInfo.css";

function CourseInfo() {
    const { courseId } = useParams<{ courseId: string }>();
    const courses = useAppSelector(selectCourses);
    const authors = useAppSelector(selectAuthors);
    const course = courses.find(
        (currentCourse) => currentCourse.id === courseId
    );

    if (!course) {
        return <Navigate to={ROUTES.COURSES} replace />;
    }

    const authorsNames = getCourseAuthors(course.authors, authors);

    return (
        <main className="course-info">
            <div className="course-info__content">
                <h1 className="course-info__title">{course.title}</h1>

                <div className="course-info__card">
                    <div className="course-info__description">
                        <h2 className="course-info__subtitle">Description:</h2>
                        <p>{course.description}</p>
                    </div>

                    <div className="course-info__details">
                        <p>
                            <strong>ID:</strong>
                            <span>{course.id}</span>
                        </p>
                        <p>
                            <strong>Duration:</strong>
                            <span>{getCourseDuration(course.duration)}</span>
                        </p>
                        <p>
                            <strong>Created:</strong>
                            <span>
                                {formatCreationDate(course.creationDate)}
                            </span>
                        </p>
                        <p>
                            <strong>Authors:</strong>
                            <span>{authorsNames.join(", ")}</span>
                        </p>
                    </div>
                </div>

                <div className="course-info__button">
                    <Link
                        className="course-info__back-link"
                        to={ROUTES.COURSES}
                    >
                        {BACK_BUTTON_TEXT}
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default CourseInfo;
