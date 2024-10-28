const express = require('express')
const router = express.Router()
const { registerController, loginController, logoutController, getUserProfileController } = require('../controllers/userController')
const { isLoggedin } = require('../middlewares/isLoggedin')

router.post("/register",registerController)

router.post("/login",loginController)

router.get("/logout",logoutController)

router.get("/profile",isLoggedin,getUserProfileController)

module.exports = router