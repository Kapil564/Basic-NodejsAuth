import OpenAI from "openai";
import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import authRoutes from "./routes/auth.routes.js"
// config of dotenv
dotenv.config()
const app=express();
const port=process.env.PORT||5173;
app.use(express.json());
app.use("/api/auth",authRoutes);
app.listen(port,()=>{
    console.log("server is running")
    connectDB()
})