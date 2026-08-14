import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCourses } from "../../services/services";
import type { Course } from "../../types/course";

export const fetchCourses = createAsyncThunk<Course[]>(
    "courses/fetchAll",
    getCourses
);
