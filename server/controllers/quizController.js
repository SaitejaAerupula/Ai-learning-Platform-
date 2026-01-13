const QuizResult = require('../models/QuizResult');

// @desc    Save a quiz result
// @route   POST /api/quizzes/result
// @access  Private
const saveQuizResult = async (req, res) => {
    const { courseTitle, score, totalQuestions } = req.body;

    try {
        const result = new QuizResult({
            user: req.user._id,
            courseTitle,
            score,
            totalQuestions,
        });

        const savedResult = await result.save();
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user quiz results
// @route   GET /api/quizzes/my-results
// @access  Private
const getMyResults = async (req, res) => {
    try {
        const results = await QuizResult.find({ user: req.user._id }).sort({ date: 1 });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { saveQuizResult, getMyResults };
