import postSchema from "../models/postModel.js"
import { User } from "../models/User.js"

export const setUserData = async (req, res) => {
    try {
        const {userId, bio, fullName, username} = req.body

        if(!userId){
            return res.status(402).json({success : false, message : 'UnAuth'})
        }

        const user = await User.findOne({clerkId : userId})
        if(user){
            return
        }
        
        const newUser = await User.create({
            clerkId : userId,
            bio : '',
            username,
            fullName
        })

        return res.status(200).json({success : true, user : newUser})
    } catch (error) {
        return res.status(500).json({success : false, message : error.message})
        
    }
}
/**
 * @desc Follow a user
 * @route POST /api/user/follow/:id
 */
export const followUser = async (req, res) => {
  try {
    const {myId} = req.body       
    const targetId = req.params.id; 

    if (myId.toString() === targetId) {
      return res.status(400).json({ success: false, message: "You cannot follow yourself" });
    }

    const user = await User.findById(myId);
    const targetUser = await User.findById(targetId);

    if (!targetUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if already following
    if (user.following.includes(targetId)) {
      return res.status(400).json({ success: false, message: "Already following this user" });
    }

    // Add follow
    user.following.push(targetId);
    targetUser.followers.push(myId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ success: true, message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const unfollowUser = async (req, res) => {
  try {
    const {myId} = req.body
    const targetId = req.params.id;

    const user = await User.findById(myId);
    const targetUser = await User.findById(targetId);

    if (!targetUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.following.includes(targetId)) {
      return res.status(400).json({ success: false, message: "You are not following this user" });
    }

    // Remove follow
    user.following = user.following.filter(id => id.toString() !== targetId);
    targetUser.followers = targetUser.followers.filter(id => id.toString() !== myId.toString());

    await user.save();
    await targetUser.save();

    res.status(200).json({ success: true, message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get list of followers for a user
 * @route GET /api/user/followers/:id
 */
export const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("followers", "username fullName imageUrl");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, followers: user.followers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get list of following users
 * @route GET /api/user/following/:id
 */
export const getFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("following", "username fullName imageUrl");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, following: user.following });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeedData = async (req, res) => {
  try {
    const {userId} = req.query
    const feedData = await postSchema.find({userId : {$ne : userId}}).sort({createdAt : -1})
    const username = await User.findOne({clerkId : userId})


    res.status(201).json({feedData : feedData, success:true, username})
  } catch (error) {
    res.status(500).json({message : error.message})
  }
}