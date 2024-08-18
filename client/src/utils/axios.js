import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3002/api", // нужно для того чтобы в теле запроса не прописывать постоянно адрес запроса
    validateStatus: () => true,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token");

    return config;
});

export default instance;
