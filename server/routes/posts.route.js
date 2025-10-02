import express from "express"
import { postImage } from "../controllers/posts.controller.js"
import upload from "../utils/upload.js"

export const router = express.Router()

router.post('/upload', upload.single("image"), postImage)