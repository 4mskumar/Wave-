import express from "express"
import { followUser, getFeedData, getFollowers, getFollowing, getGlobalUsers, removeFollower, setUserData, unfollowUser } from "../controllers/user.controller.js"
// import { protectRoute } from "../middleware/auth.js";

export const router = express.Router()

router.post('/set-user', setUserData)
router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);

router.get("/followers", getFollowers);
router.get("/following/:id", getFollowing);

router.get("/feed", getFeedData);
router.get("/g/users", getGlobalUsers);
router.post("/remove", removeFollower);