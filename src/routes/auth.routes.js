import express from "express"
import { checkAuth } from "../controllers/auth.controllers.js";
import {signup} from "../controllers/auth.controllers.js"
import { protectRoute } from "../middleware/user.auth.js";
const router=express.Router();
router.post("/signup",signup)
router.put("/check",protectRoute,checkAuth)
export default router