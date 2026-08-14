import Button from "../../common/Button/Button";
import {
    ADD_NEW_COURSE_BUTTON_TEXT,
    EMPTY_COURSE_LIST_SUBTITLE,
    EMPTY_COURSE_LIST_TITLE,
} from "../../constants";
import "./EmptyCourseList.css";

type EmptyCourseListProps = Readonly<{
    onAddCourse?: () => void;
}>;

function EmptyCourseList({ onAddCourse }: EmptyCourseListProps) {
    return (
        <main className="empty-course-list">
            <h2 className="empty-course-list__title">
                {EMPTY_COURSE_LIST_TITLE}
            </h2>
            <p className="empty-course-list__subtitle">
                {EMPTY_COURSE_LIST_SUBTITLE}
            </p>
            {onAddCourse && (
                <Button
                    buttonText={ADD_NEW_COURSE_BUTTON_TEXT}
                    onClick={onAddCourse}
                />
            )}
        </main>
    );
}

export default EmptyCourseList;
