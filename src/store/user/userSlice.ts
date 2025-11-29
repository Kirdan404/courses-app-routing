import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
};

const storedToken = localStorage.getItem("token") || "";
const storedName = localStorage.getItem("user") || "";

const initialState: UserState = {
  isAuth: Boolean(storedToken),
  name: storedName,
  email: "",
  token: storedToken,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ name: string; email: string; token: string }>) {
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
