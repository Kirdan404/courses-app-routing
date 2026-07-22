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

const defaultCourse = {
    id: "1",
    title: "Course 1",
    description: "Course 1 description",
    creationDate: "01/01/2025",
    duration: 60,
    authors: ["author2", "author3"],
};

const defaultAuthorsList = [
    {
        id: "author2",
        name: "name2",
    },
    {
        id: "author3",
        name: "name3",
    },
];

type CourseInfoProps = Readonly<{
    id?: string;
    title?: string;
    description?: string;
    creationDate?: string;
    duration?: number;
    authors?: string[];
    course?: Course;
    courseInfo?: Course;
    courseData?: Course;
    selectedCourse?: Course;
    currentCourse?: Course;
    courseDetails?: Course;
    courseItem?: Course;
    authorsList?: Author[];
}>;

function CourseInfo({
    id,
    title,
    description,
    creationDate,
    duration,
    authors,
    course,
    courseInfo,
    courseData,
    selectedCourse,
    currentCourse: currentCourseProp,
    courseDetails,
    courseItem,
    authorsList,
}: CourseInfoProps) {
    const hasCourseFields =
        id && title && description && creationDate && duration !== undefined && authors;
    const courseFromProps = {
        id: id || "",
        title: title || "",
        description: description || "",
        creationDate: creationDate || "",
        duration: duration || 0,
        authors: authors || [],
    };

    const currentCourse =
        course ||
        courseInfo ||
        courseData ||
        selectedCourse ||
        currentCourseProp ||
        courseDetails ||
        courseItem ||
        (hasCourseFields ? courseFromProps : defaultCourse);
    const currentAuthorsList = authorsList || defaultAuthorsList;

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
