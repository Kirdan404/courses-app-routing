import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteCourse as deleteCourseRequest,
    getCourses,
} from "../../services/services";
import type { Course } from "../../types/course";

export const fetchCourses = createAsyncThunk<Course[]>(
    "courses/fetchAll",
    getCourses
);

type DeleteCoursePayload = {
    courseId: string;
    token: string;
};

export const deleteCourse = createAsyncThunk<string, DeleteCoursePayload>(
    "courses/delete",
    async ({ courseId, token }) => {
        await deleteCourseRequest(courseId, token);
        return courseId;
    }
);
