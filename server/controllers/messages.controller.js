// import { io, userSocketMap } from "../index.js";
// import { Message } from "../models/Message.js";
import { io, userSocketMap } from "../index.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

export const getUserList = async (req, res) => {
  try {
    const {myId} = req.query;
    console.log(req.query);
    
    const user = await User.findOne({ clerkId: myId })
    console.log(user);
    

    // const enriched = users.map((u) => ({
    //   ...u._doc,
    //   online: Boolean(userSocketMap[u._id]),
    // }));
    if(!user)    {
      return res.status(404).json({success : false, message : 'no user found'})
    }

    res.json({ success: true, followers : user.followers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const {myId} = req.query;

    

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
    const { text, senderId } = req.body;
    const { id: receiverId } = req.params;

    const newMsg = await Message.create({ senderId, receiverId, text });

    const receiverSocket = userSocketMap[receiverId];
    console.log('In message controller : ' + receiverSocket);
    
    if (receiverSocket) {
      io.to(receiverSocket).emit("newMessage", newMsg);
    }

    res.json({ success: true, message: newMsg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
