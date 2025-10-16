import express from "express"
import { commentToPost, deletePost, getPosts, postImage, toggleLike } from "../controllers/posts.controller.js"
import upload from "../utils/upload.js"

export const router = express.Router()

router.post('/upload', upload.single("image"), postImage)
router.get('/getpost',  getPosts)
router.put('/like',  toggleLike)
router.post('/comment',  commentToPost)
router.post('/delete',  deletePost)