import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, type CurrentUser } from "../../services/services";

export const fetchCurrentUser = createAsyncThunk<CurrentUser, string>(
    "user/fetchCurrent",
    getCurrentUser
);
