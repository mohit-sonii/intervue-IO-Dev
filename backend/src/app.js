import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.json())

const PORT = process.env.PORT || 3000

const connectWithDB=async()=>{
    await mongoose.connect(`${process.env.DATABASE_URL}`)
}

const startServer = async()=>{
    try{
        await connectWithDB();
        app.listen(PORT,()=>{
            console.log(`App is listenting to PORT ${PORT}`)
        })
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

startServer()
