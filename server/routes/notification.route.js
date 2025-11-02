import express from "express";
// import { getUserNotifications } from "../controllers/notification.controller";
import { getNotifications, markAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", getNotifications);
router.put("/:id/read", markAsRead);

export { router as notificationRouter };
