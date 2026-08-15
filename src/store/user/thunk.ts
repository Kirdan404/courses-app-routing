import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCurrentUser,
    logoutUser,
    type CurrentUser,
} from "../../services/services";

export const fetchCurrentUser = createAsyncThunk<CurrentUser, string>(
    "user/fetchCurrent",
    getCurrentUser
);

export const logoutCurrentUser = createAsyncThunk<void, string>(
    "user/logoutCurrent",
    logoutUser
);
