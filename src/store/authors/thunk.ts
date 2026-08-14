import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthors } from "../../services/services";
import type { Author } from "../../types/course";

export const fetchAuthors = createAsyncThunk<Author[]>(
    "authors/fetchAll",
    getAuthors
);
