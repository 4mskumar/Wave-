import express from "express";
import { getUserList } from "../controllers/messages.controller.js";
// import { protectRoute } from "../middleware/auth.js";
// import { getUserList } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", getUserList);
// router.get("/:id",  getMessages);
// router.post("/send/:id", sendMessage);
// router.post("/send/:id", side);

export default router;
