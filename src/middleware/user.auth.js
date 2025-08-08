import jwt from "jsonwebtoken"
import User from "../model/userAuth.model.js"

export const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt
        if(!token){
            return res.status(400).json({message:"Unauthorized - No Token Provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({message:"Unauthorized -  Token is invalid"})
        }
        const user=await User.findById(decoded.userId).select("-password")
        if(!User){
            return res.status(404).json({message:"User not found"})
        }
        req.user=user
        next()
    }catch(error){
        return res.status(400).json({message:"Error in middleware"});
    }
}