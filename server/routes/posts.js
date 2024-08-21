import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
} from "../controllers/posts.js";

const router = new Router();

// Create post
router.post("/", checkAuth, createPost);

// Get all posts
router.get("/", getAll);

// Get post by id
router.get("/:id", getById);

// Get all my posts
router.get("/user/me", checkAuth, getMyPosts);

export default router;
