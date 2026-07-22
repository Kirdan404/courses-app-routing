import Button from "../../common/Button/Button";
import { BACK_BUTTON_TEXT } from "../../constants";
import { formatCreationDate } from "../../helpers/formatCreationDate";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import "./CourseInfo.css";

type Course = {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
};

type Author = {
    id: string;
    name: string;
};

type CourseInfoProps = {
    course: Course;
    authorsList: Author[];
};

function CourseInfo({ course, authorsList }: CourseInfoProps) {
    const courseAuthors = course.authors.map((authorId) => {
        return authorsList.find((author) => author.id === authorId);
    });

    const authorsNames = courseAuthors.map((author) => author?.name).join(", ");

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
                            <span>{formatCreationDate(course.creationDate)}</span>
                        </p>
                        <p>
                            <strong>Authors:</strong>
                            <span>{authorsNames}</span>
                        </p>
                    </div>
                </div>

                <div className="course-info__button">
                    <Button buttonText={BACK_BUTTON_TEXT} />
                </div>
            </div>
        </main>
    );
}

export default CourseInfo;
