import express from "express";
import mongoose from "mongoose";

const app = express();

async function start() {
    try {
        await mongoose.connect(
            "mongodb+srv://gm:zaq12345@cluster0.v0gbcii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );

        app.listen(3002, () => console.log(`Server started on port: ${3002}`));
    } catch (error) {
        console.log(error);
    }
}

start();
