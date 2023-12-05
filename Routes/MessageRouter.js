const MessageController = require('../Controllers/MessageController')
const express = require('express')
const router = express.Router()

router.post('/', MessageController.addMessage)
router.get('/', MessageController.getMessages)

module.exports = router