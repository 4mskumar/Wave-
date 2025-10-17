import cloud from "../utils/cloud.js";
import postSchema from '../models/postModel.js'
import { User } from "../models/User.js";

export const postImage = async (req, res) => {
  try {
    const { userId, caption, userImageUrl, username } = req.body;

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
      userImageUrl : userImageUrl,
      username
    });


    return res
      .status(200)
      .json({ success: true, message: "Your post has been uploaded", post: newPost  });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, please try again" + error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId

    if (!userId) return res.status(404).json({ success: false, message: 'userid not found', e: req.query })

    const allPosts = await postSchema.find({ userId })

    if (!allPosts) return res.status(400).json({ message: "No post found" })

    return res.status(201).json({ success: true, message: 'Post found', userPosts: allPosts })

  } catch (error) {
    console.log(error.message);

  }
}

export const toggleLike = async (req, res) => {
  try {
    const { userId, postId } = req.body
    if (!userId || !postId) {
      return res.status(404).json({ success: false, message: 'UserId or PostId required' })
    }

    let updatedPost;
    const post = await postSchema.findById(postId)
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }

    if (post.likes.includes(userId)) {
      updatedPost = await postSchema.findByIdAndUpdate(postId, {
        $pull: { likes: userId }
      },
        { new: true }
      )
    } else {
      updatedPost = await postSchema.findByIdAndUpdate(postId, {
        $push: { likes: userId }
      },
        { new: true }
      )
    }

    return res.status(200).json({ success: true, message: 'U just liked a post yayy!', post: updatedPost })

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message })

  }
}

export const commentToPost = async (req, res) => {
  try {
    const { text, userId, postId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ success: false, message: "UserId or PostId required" });
    }

    if (!text) {
      return res.status(400).json({ success: false, message: "Text is required" });
    }

    let post = await postSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const updatedPost = await postSchema.findByIdAndUpdate(
      postId,
      { $push: { comments: { text, userId } } },
      { new: true } // ✅ returns updated post with new comment
    );

    return res.status(200).json({
      success: true,
      message: "You just commented on a post yayy!",
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const {userId, postId} = req.body
    if(!userId){
      return res.status(401).json({success : false, message : "userId not found, unauthorized"})
    }
    if(!postId){
      return res.status(401).json({success : false, message : "postId not found"})
    }

    await postSchema.findByIdAndDelete(postId)
    

    return res.status(200).json({success : true, message : "You just deleted a post yayyy!"})
    
  } catch (error) {
    return res.status(500).json({success : false, message : error.message})
    
  }
}