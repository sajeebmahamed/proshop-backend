// external imports 
const express = require('express')
// internal imports
const { authUser, getUserProfile, registerUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// router instance 
const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)


module.exports = router