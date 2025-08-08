import bcrypt from "bcryptjs"
import User from "../model/userAuth.model.js"
import { generateToken } from "../lib/utils.js"
export const signup=async(req,res)=>{
    const{fullName,email,password}=req.body
    try{
        if(!fullName||!email||!password){
            return res.status(400).json({message:"fill the details"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 character"});
        }
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exits"})
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName:fullName,
            email:email,
            password:hashedPassword,
        })
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(200).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            })
        
        }else{
            return res.status(400).json({message:"invalid User data"})
        }
    }catch(error){
        console.log("Error"+error);
    }
}
export const checkAuth=(req,res)=>{
    try{
        return res.status(200).json(req.user)
    }catch(error){
        return res.status(200).json({message:"user not authorized"})
    }
}