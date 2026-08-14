import { RootState } from "./index";

export const selectCourses = (state: RootState) => state.courses;
export const selectAuthors = (state: RootState) => state.authors;
export const selectUser = (state: RootState) => state.user;
