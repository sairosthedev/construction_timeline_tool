const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to log in an existing user
router.post('/login', login);

// Route to get the authenticated user
router.get('/user', authMiddleware, getUser);

module.exports = router;
