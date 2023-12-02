const MessageController = require('../Controllers/MessageController')
const express = require('express')
const router = express.Router()

router.post('/', MessageController.addMessage)
router.get('/:chatId', MessageController.getMessages)

module.exports = router