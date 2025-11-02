import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  notification: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  type: { type: String, required: true },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  fullName: { type: String },
  imageUrl: { type: String },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },

  followers: [
    {
      userId: { type: String, required: true },
      username: String,
      imageUrl: String,
    },
  ],
  following: [
    {
      userId: { type: String, required: true },
      username: String,
      imageUrl: String,
    },
  ],
}, { timestamps: true });


export const User = mongoose.model("User", userSchema);
