import { Link, Navigate, useParams } from "react-router-dom";
import {
    BACK_BUTTON_TEXT,
    mockedAuthorsList,
    mockedCoursesList,
} from "../../constants";
import formatCreationDate from "../../helpers/formatCreationDate";
import getCourseDuration from "../../helpers/getCourseDuration";
import "./CourseInfo.css";

function CourseInfo() {
    const { courseId } = useParams<{ courseId: string }>();
    const course = mockedCoursesList.find(
        (currentCourse) => currentCourse.id === courseId
    );

    if (!course) {
        return <Navigate to="/courses" replace />;
    }

    const authorsNames = course.authors.map((authorId) => {
        const author = mockedAuthorsList.find(
            (currentAuthor) => currentAuthor.id === authorId
        );

        return author ? author.name : authorId;
    });

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
                    <Link className="course-info__back-link" to="/courses">
                        {BACK_BUTTON_TEXT}
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default CourseInfo;
