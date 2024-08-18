import express, { request } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // нужен для того, чтобы дать разрешение с разных ip

import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

const app = express();
dotenv.config(); // позволяет создать конфиг с данными, которые не будут видны на сервере. дает большую защиту приложению

// constants
const PORT = process.env.PORT || 3001; // оригинальная переменная PORT скрыты от посторонних глаз
const DB_USER = process.env.DB_USER; // с переменной DB_USER также как с PORT
const DB_PASSWORD = process.env.DB_PASSWORD; // too
const DB_NAME = process.env.DB_NAME; // too

// Middleware
app.use(cors()); // позволяет отправлять запросы к backend'у с разных IP
app.use(express.json()); // express будет понимать, что данные приходят в json

// Routes
app.use("/api/auth", authRoute); // регестрируем все роуты по адресу /api/auth
app.use("/api/posts", postRoute); // регестрируем все роуты по адресу /api/post

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.v0gbcii.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
        );

        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();
