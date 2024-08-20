import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Create post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);

        // with image
        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name; // создаем новое имя файла из даты + его начального имени
            const __dirname = dirname(fileURLToPath(import.meta.url)); // получаем доступ к текущей папке
            req.files.image.mv(path.join(__dirname, "..", "uploads", fileName)); // перемещаем из текущей папки в папу uploads

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            });

            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            });

            return res.json(newPostWithImage);
        }

        // without image
        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: "",
            author: req.userId,
        });

        await newPostWithoutImage.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        });
        res.json(newPostWithoutImage);
    } catch (error) {
        res.json({ message: "Something went wrong!" });
    }
};
