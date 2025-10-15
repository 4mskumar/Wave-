import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getMessages, sendMessage, getUserList } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUserList);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
