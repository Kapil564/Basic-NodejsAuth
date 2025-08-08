import jwt from "jsonwebtoken"

export const generateToken=(userId,res)=>{
    const Token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("jwt",Token,{
        maxAge:1*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:false
    })
    return Token
}