const express = require('express');
const router = express.Router();
const { saveQuizResult, getMyResults } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.route('/result').post(protect, saveQuizResult);
router.route('/my-results').get(protect, getMyResults);

module.exports = router;
