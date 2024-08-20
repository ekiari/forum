import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/Auth/authSlice";
import postSlice from "./features/post/postSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
    },
});
