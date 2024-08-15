import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String, // тип
            required: true, // обязательный или нет
            unique: true, // обязательно уникальный
        },
        password: {
            type: String,
            required: true,
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    { timestamps: true } // сохранять дату создания поста
);

export default mongoose.model("User", UserSchema);
