import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
};

const storedToken = localStorage.getItem("token") || "";
const storedUserRaw = localStorage.getItem("user") || "";

const parsedStoredUser = (() => {
  if (!storedUserRaw) return { name: "", email: "" };
  try {
    const parsed = JSON.parse(storedUserRaw);
    if (parsed && typeof parsed === "object") {
      return {
        name: (parsed as { name?: string }).name || "",
        email: (parsed as { email?: string }).email || "",
      };
    }
  } catch (err) {
    // fallback to treating raw string as name
    return { name: storedUserRaw, email: "" };
  }
  return { name: "", email: "" };
})();

const initialState: UserState = {
  isAuth: Boolean(storedToken),
  name: parsedStoredUser.name,
  email: parsedStoredUser.email,
  token: storedToken,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; email: string; token: string }>) {
      state.isAuth = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
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

export const { setUser, login, logout } = userSlice.actions;
export default userSlice.reducer;
