import express from "express";
import { handleCreateShortUrl, handleGetAnalytics, handleRedirectUrl, } from "../controllers/url.js";
const router = express.Router();
router.post("/", handleCreateShortUrl);
router.get("/:id", handleRedirectUrl);
router.get("/analytics/:id", handleGetAnalytics);
export { router };
