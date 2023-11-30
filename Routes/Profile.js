const express = require('express')
const ProfileController = require('../Controllers/ProfileController')

const router = express.Router()

router.post('/', ProfileController.CreateProfile)
router.put('/', ProfileController.UpdateProfile)
router.get('/', ProfileController.MyProfile)

module.exports = router