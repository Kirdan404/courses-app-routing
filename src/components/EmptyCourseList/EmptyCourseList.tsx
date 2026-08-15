import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import {
    ADD_NEW_COURSE_BUTTON_TEXT,
    ADMIN_ROLE,
    COURSE_CREATION_PERMISSION_MESSAGE,
    EMPTY_COURSE_LIST_SUBTITLE,
    EMPTY_COURSE_LIST_TITLE,
    ROUTES,
} from "../../constants";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";
import "./EmptyCourseList.css";

function EmptyCourseList() {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const isAdmin = user.role === ADMIN_ROLE;

    return (
        <main className="empty-course-list">
            <h2 className="empty-course-list__title">
                {EMPTY_COURSE_LIST_TITLE}
            </h2>
            {isAdmin ? (
                <>
                    <p className="empty-course-list__subtitle">
                        {EMPTY_COURSE_LIST_SUBTITLE}
                    </p>
                    <Button
                        buttonText={ADD_NEW_COURSE_BUTTON_TEXT}
                        onClick={() => navigate(ROUTES.CREATE_COURSE)}
                    />
                </>
            ) : (
                <p className="empty-course-list__subtitle">
                    {COURSE_CREATION_PERMISSION_MESSAGE}
                </p>
            )}
        </main>
    );
}

export default EmptyCourseList;
