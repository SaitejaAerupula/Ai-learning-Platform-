const express = require('express');
const router = express.Router();
const multer = require('multer');
const { generateQuiz, chatWithTutor, analyzeResume } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/generate-quiz', protect, generateQuiz);
router.post('/chat', protect, chatWithTutor);
router.post('/analyze-resume', protect, upload.single('resume'), analyzeResume);

module.exports = router;
