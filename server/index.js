import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { connectDb } from "./utils/db.js"
import { router as postRouter } from "./routes/posts.route.js"

config()

const app = express()
const PORT = process.env.PORT  || 4000


// put origin when frontend is set up

 app.use(cors({
     origin: `http://localhost:5173`
 }))


app.use(express.json())

app.use('/api/post', postRouter)

app.listen(PORT, () => {
    console.log(`Server is live ${PORT}`);
    connectDb()
})

