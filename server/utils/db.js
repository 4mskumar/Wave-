import { config } from 'dotenv'
import mongoose from 'mongoose'
config()

export const connectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log('We have connected to database yayyy!!! 🎊');            
        })
        await mongoose.connect(process.env.MONGO_DB_URL)
    } catch (error) {
        console.log(error.message);
        
    }
}