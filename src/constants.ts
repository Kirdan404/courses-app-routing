export const API_BASE_URL = "http://localhost:4000";
export const ADMIN_ROLE = "ADMIN";
export const LOGOUT_BUTTON_TEXT = "Logout";
export const STORAGE_KEYS = {
    TOKEN: "token",
    USER_NAME: "userName",
} as const;
export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTRATION: "/registration",
    COURSES: "/courses",
    CREATE_COURSE: "/courses/add",
    UPDATE_COURSE: "/courses/update/:courseId",
    COURSE_INFO: "/courses/:courseId",
    NOT_FOUND: "*",
} as const;
export const SHOW_COURSE_BUTTON_TEXT = "Show course";
export const ADD_NEW_COURSE_BUTTON_TEXT = "Add new course";
export const BACK_BUTTON_TEXT = "Back";
export const SEARCH_BUTTON_TEXT = "Search";
export const SEARCH_INPUT_PLACEHOLDER = "Input text";
export const EMPTY_COURSE_LIST_TITLE = "Course List is Empty";
export const EMPTY_COURSE_LIST_SUBTITLE =
    'Please use "Add New Course" button to add your first course';
export const COURSE_CREATION_PERMISSION_MESSAGE =
    "You don't have permissions to create a course. Please log in as ADMIN";
