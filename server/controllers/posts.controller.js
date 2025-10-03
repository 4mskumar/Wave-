import cloud from "../utils/cloud.js";
import postSchema from '../models/postModel.js'

export const postImage = async (req, res) => {
  try {
    const { userId, caption } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!caption) {
      return res
        .status(400)
        .json({ success: false, message: "Caption is required" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    let cloudUrl = null;

    if (req.file) {
      const upload = await cloud.uploader.upload(req.file.path, {
        folder: "wave_media",
      });
      cloudUrl = upload.secure_url;
    }

    if (!cloudUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const newPost = await postSchema.create({
      userId,
      caption,
      imageUrl: cloudUrl,
      likes: [],
      comments: [],
    });

    return res
      .status(200)
      .json({ success: true, message: "Your post has been uploaded", post : newPost});
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, please try again" + error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const {userId} = req.query

    if(!userId) return res.status(404).json({success : false})

      const allPosts = await postSchema.find({userId})

      if(!allPosts) return res.status(400).json({message : "No post found"})

      return res.status(201).json({success : true, message : 'Post found', userPosts : allPosts})

  } catch (error) {
    console.log(error.message);
    
  }
}
