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

type CourseCardProps = Readonly<{
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

function CourseCard({
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
}: CourseCardProps) {
    const hasCourseFields =
        id && title && description && creationDate && duration !== undefined && authors;
    const courseFromProps = {
        id: id ?? "",
        title: title ?? "",
        description: description ?? "",
        creationDate: creationDate ?? "",
        duration: duration ?? 0,
        authors: authors ?? [],
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

    const authorsNames = currentCourse.authors.map((authorId) => {
        const author = currentAuthorsList.find((author) => author.id === authorId);

        return author ? author.name : authorId;
    });

    return (
        <article className="course-card">
            <div className="course-card__content">
                <h2 className="course-card__title">{currentCourse.title}</h2>
                <p className="course-card__description">{currentCourse.description}</p>
            </div>

            <div className="course-card__info">
                <p className="course-card__info-row">
                    <strong>Authors:</strong>
                    <span className="course-card__authors">{authorsNames.join(", ")}</span>
                </p>
                <p className="course-card__info-row">
                    <strong>Duration:</strong> {getCourseDuration(currentCourse.duration)}
                </p>
                <p className="course-card__info-row">
                    <strong>Created:</strong> {formatCreationDate(currentCourse.creationDate)}
                </p>

                <Button buttonText={SHOW_COURSE_BUTTON_TEXT} />
            </div>
        </article>
    );
}

export default CourseCard;
