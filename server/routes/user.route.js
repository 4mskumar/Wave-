import express from "express"
import { followUser, getFeedData, getFollowers, getFollowing, getGlobalUsers, getUserData, removeFollower, setUserData, unfollowUser, updateBio } from "../controllers/user.controller.js"
// import { protectRoute } from "../middleware/auth.js";

export const router = express.Router()

router.post('/set-user', setUserData)
router.get('/get-user', getUserData)
router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);
router.post('/update/bio', updateBio)

router.get("/followers", getFollowers);
router.get("/following", getFollowing);

router.get("/feed", getFeedData);
router.get("/g/users", getGlobalUsers);
router.post("/remove", removeFollower);