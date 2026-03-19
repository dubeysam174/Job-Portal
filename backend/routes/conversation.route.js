// routes/conversation.route.js
import express from "express";
import {
  getOrCreateConversation,
  getMyConversations
} from "../controllers/conversation.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";  // ← fixed

const router = express.Router();

router.post("/", isAuthenticated, getOrCreateConversation);
router.get("/", isAuthenticated, getMyConversations);

export default router;