import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk userId
    text: { type: String, required: true },
    username : {type : String, required: true},
    userImageUrl : {type : String, required: true},
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk userId
    caption: { type: String, default: "" },
    imageUrl: { type: String },
    userImageUrl: { type: String },
    likes: [{ type: String }], 
    comments: [CommentSchema],
    username : {type : String}
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
