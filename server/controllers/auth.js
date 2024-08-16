import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
    try {
        const { username, password } = req.body; // получаем запрос от пользователя

        const isUsed = await User.findOne({ username }); // принимаем username

        // проверяем нет ли такого юзера уже
        if (isUsed) {
            return res.json({
                message: "This username is already occupied!",
            });
        }

        const salt = bcrypt.genSaltSync(10); // создаем сложность шифрования пароля
        const hash = bcrypt.hashSync(password, salt); // хэшируем пароль со сложностью salt

        const newUser = new User({
            // создаем нашего юзера
            username,
            password: hash,
        });

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        await newUser.save(); // записываем юзера в базу данных

        // отправка ответа клиенту
        res.json({
            newUser,
            message: "Register was successfully!",
        });
    } catch (error) {
        res.json({ message: "Registration error." });
    }
};
// Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body; // принимаем запрос
        const user = await User.findOne({ username }); // ищем юзера в базе данных

        // если юзера нет, то выдаем информацию об этом
        if (!user) {
            return res.json({
                message: "There is no such user.",
            });
        }

        const isPasswordCorret = await bcrypt.compare(password, user.password); // сравниваем пароль юзера с паролем, который ввел пользователь при логине

        if (!isPasswordCorret) {
            return res.json({
                message: "Password is incorrect.",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({
            token,
            user,
            message: "You are Log In.",
        });
    } catch (error) {
        res.json({ message: "Login error." });
    }
};
// Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: "There is no such user.",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({
            user,
            token,
        });
    } catch (error) {
        res.json({ message: "No access." });
    }
};
