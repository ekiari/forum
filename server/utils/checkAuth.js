import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    // проверяем есть ли у нас токен
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // расшифровка токена если у нас есть доступ

            req.userId = decoded.id;

            next();
        } catch (error) {
            return res.json({ message: "No access." }); // нет доступа
        }
    } else {
        return res.json({ message: "No access." }); // нет доступа
    }
};
