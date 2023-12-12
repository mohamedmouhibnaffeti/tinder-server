const express = require('express')
const LikesController = require('../Controllers/LikesController')

const router = express.Router()

router.post('/like', LikesController.LikeUser)
router.post('/superlike', LikesController.SuperLikeUser)
router.get('/like', LikesController.GetLikes)
router.get('/superlike', LikesController.GetSuperLikes)
router.get('/matches', LikesController.GetMatches)
router.get('/check', LikesController.CheckIfUserIsLiked)
router.post('/block', LikesController.BlockUser)
router.get('/block', LikesController.getBlockedContacts)

module.exports = router 