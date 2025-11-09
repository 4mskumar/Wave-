import { autoTranslateWithAI } from "../utils/ai.js"
import postSchema from '../models/postModel.js'

export const autoTranslate = async (req, res) => {
    try {
        const {postId} = req.body
        console.log(postId);
        
        const post = await postSchema.findById(postId)
        const caption = await autoTranslateWithAI(post.caption)

        return res.status(200).json({success : true, caption})
        
    } catch (error) {
        return res.status(500).json({success : false, message : error.message})
        
    }
}