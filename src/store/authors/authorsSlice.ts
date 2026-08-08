import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuthors } from "../../services/services";
import type { Author } from "../../types/course";

type AuthorsState = Author[];

const initialState: AuthorsState = [];

export const fetchAuthors = createAsyncThunk<Author[]>(
    "authors/fetchAll",
    async () => {
        return getAuthors();
    }
);

const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {
        setAuthors(_state, action: PayloadAction<Author[]>) {
            return action.payload;
        },
        addAuthor(state, action: PayloadAction<Author>) {
            state.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAuthors.fulfilled,
            (_state, action) => action.payload
        );
    },
});

export const { setAuthors, addAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
