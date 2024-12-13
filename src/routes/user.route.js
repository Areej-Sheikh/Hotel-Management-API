const express = require('express')
const router = express()
const {authenticateUser} = require('../middlewares/auth.middleware');
const { currentUser, signup,login, logout,updateprofile , resetPassword} = require('../controllers/userRoute.controller');

router.get('/current-user', authenticateUser,currentUser)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', authenticateUser, logout)
router.put('/profile', authenticateUser, updateprofile)
router.post('/reset-password', resetPassword)

module.exports = router;