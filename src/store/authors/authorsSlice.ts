import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Author } from "../../types/course";
import { createAuthor, fetchAuthors } from "./thunk";

type AuthorsState = Author[];

const initialState: AuthorsState = [];

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
        builder
            .addCase(fetchAuthors.fulfilled, (_state, action) => action.payload)
            .addCase(createAuthor.fulfilled, (state, action) => {
                state.push(action.payload);
            });
    },
});

export const { setAuthors, addAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
