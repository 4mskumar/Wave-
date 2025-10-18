import postSchema from "../models/postModel.js"
import { User } from "../models/User.js"

export const setUserData = async (req, res) => {
  try {
    const { userId, imageUrl, fullName, username } = req.body

    if (!userId) {
      return res.status(402).json({ success: false, message: 'UnAuth' })
    }

    const user = await User.findOneAndUpdate({ clerkId: userId }, {
      clerkId: userId,
      bio: '',
      username,
      fullName,
      imageUrl
    }, { new: true })
    if (user) {
      return
    }

    const newUser = await User.create({
      clerkId: userId,
      bio: '',
      username,
      fullName,
      imageUrl
    })

    return res.status(200).json({ success: true, user: newUser })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })

  }
}
/**
 * @desc Follow a user
 * @route POST /api/user/follow/:id
 */
export const followUser = async (req, res) => {
  try {
    const { myId } = req.body; // follower Clerk ID
    const targetId = req.params.id; // target Clerk ID

    if (!myId || !targetId) {
      return res.status(400).json({ success: false, message: "Missing IDs" });
    }

    const user = await User.findOne({ clerkId: myId });
    const targetUser = await User.findOne({ clerkId: targetId });

    // console.log(user);


    if (!user || !targetUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (myId === targetId) {
      return res.status(400).json({ success: false, message: "You cannot follow yourself" });
    }

    const alreadyFollowing = user.following.some(f => f.userId === targetId);
    console.log(alreadyFollowing);

    if (alreadyFollowing) {
      return res.status(400).json({ success: false, message: "Already following" });
    }

    // ✅ Push correctly structured objects
    user.following.push({
      userId: targetUser.clerkId,
      username: targetUser.username,
      imageUrl: targetUser.imageUrl || "",
    });

    targetUser.followers.push({
      userId: user.clerkId,
      username: user.username,
      imageUrl: user.imageUrl || "",
    });

    await user.save();
    await targetUser.save();

    res.status(200).json({ success: true, message: "Followed successfully" });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




export const unfollowUser = async (req, res) => {
  try {
    const { myId } = req.body
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
    // console.log(req.query);

    const { userId } = req.query
    // console.log();

    const user = await User.findOne({ clerkId: userId });
    // console.log(user);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found 12" + req.userId, body: req.userId });
    }
    // console.log(user.followers);

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
    const { id } = req.query;
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

    const { userId } = req.query
    // console.log(userId);

    const feedData = await postSchema.find({ userId: { $ne: userId } }).sort({ createdAt: -1 })

    res.status(201).json({ feedData: feedData, success: true })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getGlobalUsers = async (req, res) => {
  try {
    const { userId } = req.query
    if (!userId)
      return res.status(404).json({ message: 'unauth', success: false })

    const gUsers = await User.find({ clerkId: { $ne: userId } }).sort({ createdAt: -1 })

    return res.status(201).json({ gUsers, success: true })

  } catch (error) {
    return res.status(500).json({ message: error.message, success: false })
  }
}

export const removeFollower = async (req, res) => {
  try {
    const { myId, targetId } = req.body

    const user = await User.findOne({ clerkId: myId })
    const target = await User.findOne({ clerkId: targetId })
    // console.log(user);
    // console.log(target);

    const alreadyFollower = user.followers.some(f => targetId === f.userId)
    console.log(alreadyFollower);
    
    
    if (!alreadyFollower) {
      return res.status(400).json({ success: false, message: "User doesn't follow you" });
    }

    user.followers = user.followers.filter(f => f.userId !== targetId);
    target.following = target.following.filter(f => f.userId !== myId);

    await user.save();
    await target.save();

    res.status(200).json({ success: true, message: "User removed successfully", userF : user.followers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}