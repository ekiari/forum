import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
    removePost,
    updatePost,
    getPostComments,
} from "../controllers/posts.js";

const router = new Router();

// Create post
router.post("/", checkAuth, createPost);

// Get all posts
router.get("/", getAll);

// Get post by id
router.get("/:id", getById);

// Update post
router.put("/:id", checkAuth, updatePost);

// Get all my posts
router.get("/user/me", checkAuth, getMyPosts);

// Remove post
router.delete("/:id", checkAuth, removePost);

// Get post comments
router.get("/comments/:id", getPostComments);

export default router;
