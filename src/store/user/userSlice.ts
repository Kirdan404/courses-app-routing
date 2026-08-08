import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants";

type UserState = {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
};

const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN) ?? "";
const storedUserName = localStorage.getItem(STORAGE_KEYS.USER_NAME) ?? "";

const initialState: UserState = {
    isAuth: Boolean(storedToken),
    name: storedUserName,
    email: "",
    token: storedToken,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(
            state,
            action: PayloadAction<{
                name: string;
                email: string;
                token: string;
            }>
        ) {
            state.isAuth = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout(state) {
            state.isAuth = false;
            state.name = "";
            state.email = "";
            state.token = "";
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
