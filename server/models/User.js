import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk user id
  username: { type: String, required: true },
  fullName: { type: String },
  imageUrl: { type: String }, // profile image from Clerk
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default : [] }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default : [] }],
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
