import express from "express";
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import config from "./config.js"
dotenv.config();

const PORT_NUMBER = config.PORT_NUMBER

console.log(PORT_NUMBER)

const app = express();
app.use(express.json());

mongoose.connection.on("connected",()=>{
    console.log("✅ Mongoose connected successfully");
})

mongoose.connection.on("error",(err)=>{
    console.error("❌ Mongoose connection error:", err);
})

async function main(){
    try {
        await mongoose.connect(config.MONGO_AUTH_URL!);
        console.log("🚀 Connected to MongoDB (await complete)");
        app.listen(PORT_NUMBER,()=>{
            console.log(`Server is up and running on PORT_NUMBER : ${PORT_NUMBER}`)
        })
    } catch (error) {
        console.error("❌ Error Connecting to MongoDB:", error);
        process.exit(1);
    }
}

main();

