import { useMemo } from "react";
import Button from "../../common/Button/Button";
import formatCreationDate from "../../helpers/formatCreationDate";
import getCourseDuration from "../../helpers/getCourseDuration";
import "./CourseInfo.css";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectAuthors, selectCourses } from "../../store/selectors";

type CourseInfoProps = {
  id: string;
  title: string;
  description: string;
  duration: number | string;
  creationDate: string;
  authors?: string[];
  onBack?: () => void;
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
  const params = useParams();
  const courses = useAppSelector(selectCourses);
  const authorsListFromStore = useAppSelector(selectAuthors);

  const courseId = id || params.courseId || "";
  const courseFromStore = useMemo(
    () => courses.find((course) => course.id === courseId),
    [courses, courseId]
  );

  const authorsDictionary = useMemo(() => {
    const dict: Record<string, string> = {};
    authorsListFromStore.forEach((a) => {
      dict[a.id] = a.name;
    });
    return dict;
  }, [authorsListFromStore]);

  const resolvedTitle = title || courseFromStore?.title || "";
  const resolvedDescription = description || courseFromStore?.description || "";
  const resolvedDuration = duration ?? courseFromStore?.duration ?? 0;
  const resolvedCreationDate = creationDate || courseFromStore?.creationDate || "";

  const rawAuthors = authors && authors.length ? authors : courseFromStore?.authors || [];
  const resolvedAuthors =
    typeof rawAuthors[0] === "string"
      ? (rawAuthors as string[]).map((authorIdOrName) => authorsDictionary[authorIdOrName] || authorIdOrName)
      : [];

  const authorsList = resolvedAuthors.join(", ");
  const formattedDate = formatCreationDate(resolvedCreationDate);
  const formattedDuration = getCourseDuration(resolvedDuration);
  const displayId = courseId || courseFromStore?.id || "";
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
