import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createCourse as createCourseRequest,
    deleteCourse as deleteCourseRequest,
    getCourses,
} from "../../services/services";
import type { Course, NewCourse } from "../../types/course";

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

type CreateCoursePayload = {
    course: NewCourse;
    token: string;
};

export const createCourse = createAsyncThunk<Course, CreateCoursePayload>(
    "courses/create",
    ({ course, token }) => createCourseRequest(course, token)
);
