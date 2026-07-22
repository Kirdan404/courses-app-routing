import Button from "../../common/Button/Button";
import { BACK_BUTTON_TEXT, mockedAuthorsList, mockedCoursesList } from "../../constants";
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
    course?: Course;
    authorsList?: Author[];
};

function CourseInfo({ course, authorsList }: CourseInfoProps) {
    const currentCourse = course || mockedCoursesList[0];
    const currentAuthorsList = authorsList || mockedAuthorsList;

    const courseAuthors = currentCourse.authors.map((authorId) => {
        return currentAuthorsList.find((author) => author.id === authorId);
    });

    const authorsNames = courseAuthors.map((author) => author?.name).join(", ");

    return (
        <main className="course-info">
            <div className="course-info__content">
                <h1 className="course-info__title">{currentCourse.title}</h1>

                <div className="course-info__card">
                    <div className="course-info__description">
                        <h2 className="course-info__subtitle">Description:</h2>
                        <p>{currentCourse.description}</p>
                    </div>

                    <div className="course-info__details">
                        <p>
                            <strong>ID:</strong>
                            <span>{currentCourse.id}</span>
                        </p>
                        <p>
                            <strong>Duration:</strong>
                            <span>{getCourseDuration(currentCourse.duration)}</span>
                        </p>
                        <p>
                            <strong>Created:</strong>
                            <span>{formatCreationDate(currentCourse.creationDate)}</span>
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
