// routes/message.route.js
import express from "express";
import {
  sendMessage,
  getMessages,
  markAsSeen
} from "../controllers/message.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";  // ← fixed

const router = express.Router();

router.post("/send", isAuthenticated, sendMessage);
router.get("/:conversationId", isAuthenticated, getMessages);
router.put("/seen/:conversationId", isAuthenticated, markAsSeen);

export default router;