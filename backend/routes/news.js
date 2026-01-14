import express from "express";
import { getAiNews } from "../controllers/newsControllers.js";

const router = express.Router();

// AI news proxy/aggregator
router.route("/ai-news").get(getAiNews);

export default router;
