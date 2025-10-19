import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  text: { type: String, trim: true },
  image: { type: String },
  seen: { type: Boolean, default: false },
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);
