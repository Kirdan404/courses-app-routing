import Button from "../../../../common/Button/Button";
import getCourseDuration from "../../../../helpers/getCourseDuration";
import formatCreationDate from "../../../../helpers/formatCreationDate";
import { Link } from "react-router-dom";
import "./CourseCard.css";

type CourseCardProps = {
  course: {
    id: string;
    title: string;
    description: string;
    duration: number | string;
    creationDate: string;
    authors: string[];
  };
  title: string;
  description: string;
  duration: number | string;
  creationDate: string;
  authors: string[];
  allAuthors: { id: string; name: string }[];
  onShow: () => void;
};

export default function CourseCard({ course, title, description, duration, creationDate, authors, onShow }: CourseCardProps) {
  return (
    <article className="course-card">
      <div className="course-card__body">
        <h3 className="course-card__title">{title}</h3>
        <p className="course-card__description">{description}</p>
      </div>

      <div className="course-card__sidebar">
        <div className="course-card__meta">
          <span className="course-card__meta-label">Duration:</span>
          <span className="course-card__meta-value">{getCourseDuration(duration)}</span>
        </div>
        <div className="course-card__meta">
          <span className="course-card__meta-label">Created:</span>
          <span className="course-card__meta-value">{formatCreationDate(creationDate)}</span>
        </div>
        <div className="course-card__meta">
          <span className="course-card__meta-label">Authors:</span>
          <span className="course-card__meta-value course-card__authors">
            {authors.join(", ")}
          </span>
        </div>
        <Link to={`/courses/${course.id}`}>
          <Button className="course-card__button" buttonText="Show course" onClick={onShow} />
        </Link>
      </div>
    </article>
  );
}
