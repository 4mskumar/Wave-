import express from "express";
import { getMessages, getUserList, markMessagesAsSeen, sendMessage } from "../controllers/messages.controller.js";
// import { protectRoute } from "../middleware/auth.js";
// import { getUserList } from "../controllers/message.controller.js";

export const router = express.Router();

router.get("/users", getUserList);
router.get("/:id",  getMessages);
router.post("/send/:id", sendMessage);
// router.post("/send/:id", side);
router.put("/seen/:id", markMessagesAsSeen); // ✅ new route

export default router;
