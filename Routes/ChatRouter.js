const express = require('express')
const ChatController = require('../Controllers/ChatController')
const router = express.Router()

router.post('/', ChatController.createChat)
router.get('/:userEmail', ChatController.userChats)
router.get('/find/:firstEmail/:secondEmail', ChatController.createChat)

module.exports = router