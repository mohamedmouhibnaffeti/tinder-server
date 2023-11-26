const express = require('express')
const AuthController = require('../Controllers/auth')
const router = express.Router()

router.post('/signup', AuthController.Register)
router.post('/login', AuthController.Login)
router.get('/logout', AuthController.Logout)

module.exports =  router