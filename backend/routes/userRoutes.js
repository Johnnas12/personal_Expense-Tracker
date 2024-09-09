const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();


// Authentication and authorization routes
router.post('/register', registerUser);

module.exports = router;