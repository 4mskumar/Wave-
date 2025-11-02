
import { io, userSocketMap } from "../index.js";
import { Notification } from "../models/NotificationModel.js";
import { User } from "../models/User.js";

export const createNotification = async (type, senderId, receiverId) => {
    try {
        const sender = await User.findOne({ clerkId: senderId });
        console.log('sender  ', sender);
        
        if (!sender) return;

        let message = "";
        if (type === "follow") message = `${sender.username} started following you`;
        if (type === "like") message = `${sender.username} liked your post`;

        const newNotification = await Notification.create({
            senderId,
            receiverId,
            type,
            message,
            senderUsername: sender.username,
            senderImage: sender.imageUrl, // ✅ added
        });

        // Optionally emit through socket
        const receiverSocket = userSocketMap.get(receiverId);
        if (receiverSocket) {
            io.to(receiverSocket).emit("newNotification", newNotification);
        }

        return newNotification;
    } catch (err) {
        console.log("Error creating notification:", err.message);
    }
};

export const getNotifications = async (req, res) => {
    try {
        const { userId } = req.query;
        const notifications = await Notification.find({ receiverId: userId })
            .sort({ createdAt: -1 })
            .lean();

        res.json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Mark as read
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndUpdate(id, { isRead: true });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
