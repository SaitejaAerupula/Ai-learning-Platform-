const express = require('express');
const router = express.Router();
const { generateQuiz, chatWithTutor } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-quiz', protect, generateQuiz);
router.post('/chat', protect, chatWithTutor);

module.exports = router;
