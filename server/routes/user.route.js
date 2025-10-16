import express from "express"
import { followUser, getFollowers, getFollowing, setUserData, unfollowUser } from "../controllers/user.controller.js"
// import { protectRoute } from "../middleware/auth.js";

export const router = express.Router()

router.post('/set-user', setUserData)
router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);

router.get("/followers/:id", getFollowers);
router.get("/following/:id", getFollowing);