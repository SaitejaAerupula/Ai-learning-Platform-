const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Generate a quiz based on text content
// @route   POST /api/ai/generate-quiz
// @access  Private
const generateQuiz = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        // Use the latest model
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Generate a quiz with 5 multiple choice questions based on the following content. 
    Return the response in strictly valid JSON format with the following structure:
    [
      {
        "question": "Question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A"
      }
    ]
    Do not include any markdown formatting (like \`\`\`json). Just the raw JSON array.
    
    Content:
    ${content}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the text if it contains markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const quiz = JSON.parse(cleanedText);

        res.json(quiz);
    } catch (error) {
        console.error('AI Generation Error:', error);

        // Fallback to mock data if AI fails (e.g., invalid key)
        console.log('Falling back to mock quiz data');
        const mockQuiz = [
            {
                question: "What is the main purpose of this topic? (Mock Question)",
                options: ["To learn", "To sleep", "To eat", "To dance"],
                correctAnswer: "To learn"
            },
            {
                question: "Which of the following is true? (Mock Question)",
                options: ["AI is magic", "AI is math", "AI is food", "AI is a toy"],
                correctAnswer: "AI is math"
            },
            {
                question: "Select the correct option. (Mock Question)",
                options: ["Option A", "Option B", "Option C", "Option D"],
                correctAnswer: "Option A"
            },
            {
                question: "Another mock question for testing.",
                options: ["Yes", "No", "Maybe", "So"],
                correctAnswer: "Yes"
            },
            {
                question: "Final mock question.",
                options: ["1", "2", "3", "4"],
                correctAnswer: "1"
            }
        ];
        res.json(mockQuiz);
    }
};

// @desc    Chat with AI Tutor
// @route   POST /api/ai/chat
// @access  Private
const chatWithTutor = async (req, res) => {
    const { message, context } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are a helpful AI Tutor. 
    Context: ${context || 'General knowledge'}
    
    Student: ${message}
    Tutor:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error('AI Chat Error:', error);
        res.json({ reply: "I'm having trouble connecting to my brain right now. (Check API Key)" });
    }
};

module.exports = { generateQuiz, chatWithTutor };
