import express from "express";
import { autoTranslate } from "../controllers/ai.controller.js";


export const router = express.Router();

router.post('/translate', autoTranslate)

export default router;
