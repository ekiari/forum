import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ username, password }) => {
        try {
            const { data } = await axios.post("/auth/register", {
                username,
                password,
            });

            if (data.token) {
                window.localStorage.setItem("token", data.token);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ username, password }) => {
        try {
            const { data } = await axios.post("/auth/login", {
                username,
                password,
            });

            if (data.token) {
                window.localStorage.setItem("token", data.token);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // register user
        // запрос отправляется
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
        });

        // запрос выполнен
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });

        // возникла ошибка
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
        });

        // login user
        // запрос отправляется
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
        });

        // запрос выполнен
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });

        // возникла ошибка
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
        });
    },
});

export default authSlice.reducer;
