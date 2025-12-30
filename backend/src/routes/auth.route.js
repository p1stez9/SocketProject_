import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup", signup )
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile",protectRoute, updateProfile) 
// protectRoute เอาไว้เช็คว่าสามารถ update profile ได้มั้ยถ้าไม่ได้จะ res กลับมา

router.get("/check", protectRoute, checkAuth)

export default router
