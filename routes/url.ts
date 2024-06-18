import express from "express";
import {
  handleCreateShortUrl,
  handleGetAnalytics,
  handleRedirectUrl,
  handleRenderAllUrls,
  handleDeleteLink
} from "../controllers/url.js";
const router = express.Router();

router.post("/", handleCreateShortUrl);

router.get("/:id", handleRedirectUrl);

router.get("/analytics/:id", handleGetAnalytics);

router.get('/',handleRenderAllUrls)

router.post('/delLink/:id',handleDeleteLink)
export { router };
