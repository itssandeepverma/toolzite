import express from "express";
import { createBlog, getBlogs, getBlogBySlug, toggleUpvote, uploadBlogImage, deleteBlog, updateBlog } from "../controllers/blogControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/blogs").get(getBlogs).post(isAuthenticatedUser, authorizeRoles("admin"), createBlog);
router.route("/blogs/:slug").get(getBlogBySlug);
router.route("/blogs/:id/upvote").post(isAuthenticatedUser, toggleUpvote);
router.route("/blogs/upload-image").post(isAuthenticatedUser, authorizeRoles("admin"), uploadBlogImage);
router.route("/blogs/id/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateBlog);
router.route("/blogs/id/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlog);

export default router;
