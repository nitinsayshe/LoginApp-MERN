const express = require("express")
const router = express.Router()
const { registerUser, verifyEmail,loginUser } = require("../controller/users")



router.post("/api/users/userRegister",registerUser)
router.get("/api/users/:id/verify/:token/",verifyEmail)
router.post("/api/auth",loginUser)

module.exports=router