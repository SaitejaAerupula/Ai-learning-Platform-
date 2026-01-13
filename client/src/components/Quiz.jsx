import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const Quiz = ({ content }) => {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const { user } = useContext(AuthContext);

    const generateQuiz = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                'http://localhost:5000/api/ai/generate-quiz',
                { content },
                config
            );
            setQuiz(data);
        } catch (error) {
            console.error('Error generating quiz:', error);
            alert('Failed to generate quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (questionIndex, option) => {
        if (submitted) return;
        setAnswers((prev) => ({
            ...prev,
            [questionIndex]: option,
        }));
    };

    const handleSubmit = () => {
        let newScore = 0;
        quiz.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                newScore += 1;
            }
        });
        setScore(newScore);
        setSubmitted(true);
    };

    if (!quiz && !loading) {
        return (
            <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Ready to test your knowledge?</p>
                <button
                    onClick={generateQuiz}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold shadow-md transition"
                >
                    Generate AI Quiz
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="mt-8 flex flex-col items-center justify-center text-gray-500">
                <Loader className="w-8 h-8 animate-spin mb-2" />
                <p>Generating questions from course content...</p>
            </div>
        );
    }

    return (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Quiz Time!</h3>

            <div className="space-y-8">
                {quiz.map((q, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-semibold text-lg mb-4">{index + 1}. {q.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((option, optIndex) => {
                                const isSelected = answers[index] === option;
                                const isCorrect = option === q.correctAnswer;
                                let buttonClass = "w-full text-left p-3 rounded-lg border transition ";

                                if (submitted) {
                                    if (isCorrect) buttonClass += "bg-green-100 border-green-500 text-green-800";
                                    else if (isSelected && !isCorrect) buttonClass += "bg-red-100 border-red-500 text-red-800";
                                    else buttonClass += "bg-gray-50 border-gray-200 opacity-60";
                                } else {
                                    if (isSelected) buttonClass += "bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500";
                                    else buttonClass += "hover:bg-gray-50 border-gray-200";
                                }

                                return (
                                    <button
                                        key={optIndex}
                                        onClick={() => handleOptionSelect(index, option)}
                                        className={buttonClass}
                                        disabled={submitted}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{option}</span>
                                            {submitted && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                                            {submitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {!submitted ? (
                <div className="mt-8 text-center">
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(answers).length !== quiz.length}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Quiz
                    </button>
                </div>
            ) : (
                <div className="mt-8 p-6 bg-indigo-50 rounded-xl text-center">
                    <h4 className="text-2xl font-bold text-indigo-900 mb-2">Quiz Complete!</h4>
                    <p className="text-xl text-indigo-700">
                        You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{quiz.length}</span>
                    </p>
                    <button
                        onClick={() => { setQuiz(null); setSubmitted(false); setAnswers({}); setScore(0); }}
                        className="mt-4 text-indigo-600 hover:underline font-medium"
                    >
                        Take Another Quiz
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
