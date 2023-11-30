const express = require('express')
const UserController = require('../Controllers/UserController')

const router = express.Router()

router.delete('/', UserController.deleteUser)

module.exports = router
