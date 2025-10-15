import { io, userSocketMap } from "../index.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

export const getUserList = async (req, res) => {
  try {
    const myId = req.user._id;
    const users = await User.find({ _id: { $ne: myId } }).select("fullName username imageUrl");

    const enriched = users.map((u) => ({
      ...u._doc,
      online: Boolean(userSocketMap[u._id]),
    }));

    res.json({ success: true, users: enriched });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const newMsg = await Message.create({ senderId, receiverId, text, image });

    const receiverSocket = userSocketMap[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit("newMessage", newMsg);
    }

    res.json({ success: true, message: newMsg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
