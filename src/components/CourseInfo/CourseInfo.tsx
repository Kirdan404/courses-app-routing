import Button from "../../common/Button/Button";
import formatCreationDate from "../../helpers/formatCreationDate";
import getCourseDuration from "../../helpers/getCourseDuration";
import { mockedAuthorsList, mockedCoursesList } from "../../constants";
import "./CourseInfo.css";
import { Link } from "react-router-dom";

type CourseInfoProps = {
  id: string;
  title: string;
  description: string;
  duration: number | string;
  creationDate: string;
  authors?: string[];
  onBack?: () => void;
};

const authorNameById: Record<string, string> = {};
mockedAuthorsList.forEach((author) => {
  authorNameById[author.id] = author.name;
});

export default function CourseInfo({
  id,
  title,
  description,
  duration,
  creationDate,
  authors,
  onBack,
}: CourseInfoProps) {
  const courseFromMocks =
    mockedCoursesList.find((course) => course.id === id) || mockedCoursesList[0];

  const resolvedTitle = title || courseFromMocks?.title || "";
  const resolvedDescription = description || courseFromMocks?.description || "";
  const resolvedDuration = duration ?? courseFromMocks?.duration ?? 0;
  const resolvedCreationDate = creationDate || courseFromMocks?.creationDate || "";

  const rawAuthors = (authors && authors.length ? authors : courseFromMocks?.authors) || [];
  const resolvedAuthors = rawAuthors.map((author) => authorNameById[author] || author);

  const formattedDate = formatCreationDate(resolvedCreationDate);
  const formattedDuration = getCourseDuration(resolvedDuration);
  const authorsList = resolvedAuthors.join(", ");
  const displayId = id || courseFromMocks?.id || "";
  const handleBack = onBack || (() => {});

  return (
    <section className="course-info">
      <h2 className="course-info__title">{resolvedTitle}</h2>

      <div className="course-info__card">
        <div className="course-info__description-block">
          <h3 className="course-info__section-title">Description:</h3>
          <p className="course-info__description">{resolvedDescription}</p>
        </div>

        <div className="course-info__details">
          <div className="course-info__row">
            <span className="course-info__label">ID:</span>
            <span className="course-info__value course-info__value--mono">{displayId}</span>
          </div>
          <div className="course-info__row">
            <span className="course-info__label">Duration:</span>
            <span className="course-info__value">{formattedDuration}</span>
          </div>
          <div className="course-info__row">
            <span className="course-info__label">Created:</span>
            <span className="course-info__value">{formattedDate}</span>
          </div>
          <div className="course-info__row">
            <span className="course-info__label">Authors:</span>
            <span className="course-info__value">{authorsList}</span>
          </div>
        </div>
      </div>

      <div className="course-info__actions">
        <Link to="/courses">
          <Button className="course-info__back" buttonText="BACK" onClick={handleBack} />
        </Link>
      </div>
    </section>
  );
}
