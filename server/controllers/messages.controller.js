// import { io, userSocketMap } from "../index.js";
// import { Message } from "../models/Message.js";
import { io, userSocketMap } from "../index.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import { decrypt, encrypt } from "../utils/crypto.js";

export const getUserList = async (req, res) => {
  try {
    const { myId } = req.query;
    console.log(req.query);

    const user = await User.findOne({ clerkId: myId })
    console.log(user);


    // const enriched = users.map((u) => ({
    //   ...u._doc,
    //   online: Boolean(userSocketMap[u._id]),
    // }));
    if (!user) {
      return res.status(404).json({ success: false, message: 'no user found' })
    }

    res.json({ success: true, followers: user.followers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { myId } = req.query;



    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

     const decryptedMessages = messages.map((msg) => ({
      ...msg._doc,
      text: msg.text ? decrypt(msg.text) : "",
    }));

    res.json({ success: true, messages : decryptedMessages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, senderId, image } = req.body; // ✅ include image
    const { id: receiverId } = req.params;

    const encryptedText = encrypt(text || '')

    const newMsg = await Message.create({
      senderId,
      receiverId,
      text : encryptedText,
      image, // ✅ store base64 or URL
    });

    const decryptedText = {
      ...newMsg._doc, text : text || ''
    }


    const receiverSocket = userSocketMap.get(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("newMessage", decryptedText);
    }

    res.json({ success: true, message: decryptedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Mark messages as seen
export const markMessagesAsSeen = async (req, res) => {
  try {
    const { myId } = req.query;
    const { id: targetId } = req.params;

    // Mark all unseen messages from targetId → myId as seen
    await Message.updateMany(
      { senderId: targetId, receiverId: myId, seen: false },
      { $set: { seen: true } }
    );

    res.json({ success: true, message: "Messages marked as seen" });
  } catch (error) {
    console.error("Error marking messages seen:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
