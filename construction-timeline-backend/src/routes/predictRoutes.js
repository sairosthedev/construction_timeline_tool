const express = require('express');
const { predict } = require('../controllers/predictController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to submit project data and get a delay prediction
router.post('/', authMiddleware, predict);

module.exports = router;
