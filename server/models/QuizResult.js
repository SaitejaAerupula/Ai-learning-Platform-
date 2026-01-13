const mongoose = require('mongoose');

const quizResultSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        courseTitle: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
