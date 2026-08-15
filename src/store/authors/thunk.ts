import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createAuthor as createAuthorRequest,
    getAuthors,
} from "../../services/services";
import type { Author, NewAuthor } from "../../types/course";

export const fetchAuthors = createAsyncThunk<Author[]>(
    "authors/fetchAll",
    getAuthors
);

type CreateAuthorPayload = {
    author: NewAuthor;
    token: string;
};

export const createAuthor = createAsyncThunk<Author, CreateAuthorPayload>(
    "authors/create",
    ({ author, token }) => createAuthorRequest(author, token)
);
