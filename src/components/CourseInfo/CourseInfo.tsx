import Button from "../../common/Button/Button";
import formatCreationDate from "../../helpers/formatCreationDate";
import getCourseDuration from "../../helpers/getCourseDuration";
import "./CourseInfo.css";

type CourseInfoProps = {
  id: string;
  title: string;
  description: string;
  duration: number | string;
  creationDate: string;
  authors: string[];
  onBack: () => void;
};

export default function CourseInfo({
  id,
  title,
  description,
  duration,
  creationDate,
  authors,
  onBack,
}: CourseInfoProps) {
  const formattedDate = formatCreationDate(creationDate);
  const formattedDuration = getCourseDuration(duration);
  const authorsList = authors.join(", ");

  return (
    <section className="course-info">
      <h2 className="course-info__title">{title}</h2>

      <div className="course-info__card">
        <div className="course-info__description-block">
          <h3 className="course-info__section-title">Description:</h3>
          <p className="course-info__description">{description}</p>
        </div>

        <div className="course-info__details">
          <div className="course-info__row">
            <span className="course-info__label">ID:</span>
            <span className="course-info__value course-info__value--mono">{id}</span>
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
        <Button className="course-info__back" buttonText="BACK" onClick={onBack} />
      </div>
    </section>
  );
}
