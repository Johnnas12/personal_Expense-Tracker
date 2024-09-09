const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();


// Authentication and authorization routes
router.post('/register', registerUser);
router.post('/login',  loginUser);
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;