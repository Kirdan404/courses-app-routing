import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../types/course";
import {
    createCourse,
    deleteCourse as deleteCourseThunk,
    fetchCourses,
} from "./thunk";

type CoursesState = Course[];

const initialState: CoursesState = [];

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses(_state, action: PayloadAction<Course[]>) {
            return action.payload;
        },
        addCourse(state, action: PayloadAction<Course>) {
            state.push(action.payload);
        },
        updateCourse(state, action: PayloadAction<Course>) {
            const index = state.findIndex((c) => c.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        removeCourse(state, action: PayloadAction<string>) {
            return state.filter((course) => course.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.fulfilled, (_state, action) => action.payload)
            .addCase(deleteCourseThunk.fulfilled, (state, action) =>
                state.filter((course) => course.id !== action.payload)
            )
            .addCase(createCourse.fulfilled, (state, action) => {
                state.push(action.payload);
            });
    },
});

export const { setCourses, addCourse, updateCourse, removeCourse } =
    coursesSlice.actions;
export const deleteCourse = removeCourse;
export default coursesSlice.reducer;
