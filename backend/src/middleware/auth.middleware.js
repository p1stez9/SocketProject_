import jwt, { decode } from "jsonwebtoken"
import User from " ../models/user.model.js" 

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt

        if(!token) {
            return res.status(401).json({
                message : "Unauthorized - No Token Provided"
            })
        }

        // คือเวลาจะดูว่าใช่ cookies ของ user นี้มั้ย จะดูตรง userID ที่ส่งมาเพราะถ้ามองจะไม่รู้ว่ามันมีอะไรบ้าง
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) {
            return res.status(401).json({
                message : "Unauthorized - Invalid Token"
            })
        }

        const user = await User.findById(decode.userId).select("-password")

        if(!user) {
            return res.status(401).json({
                message : "User not found"
            })
        }

        req.user = user
        
        next()

    } catch (error) {
        console.log("Error in protextRoute middleware: ",error.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}