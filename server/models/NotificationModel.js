// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    senderId: String, // Clerk ID or User ID
    receiverId: String,
    type: String, // "follow" | "like" etc
    message: String,
    isRead: { type: Boolean, default: false },
    senderUsername: String,
    senderImage: String,
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
