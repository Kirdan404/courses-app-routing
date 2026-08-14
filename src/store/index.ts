import { configureStore } from "@reduxjs/toolkit";
import authorsReducer from "./authors/authorsSlice";
import coursesReducer from "./courses/coursesSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        courses: coursesReducer,
        authors: authorsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
