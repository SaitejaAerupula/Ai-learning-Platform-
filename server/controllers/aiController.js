const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const pdf = require('pdf-parse');
const mammoth = require('mammoth');

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
        res.json({ reply: "I'm having trouble connecting to my brain right now. Please ensure your GEMINI_API_KEY is set correctly in the server .env file." });
    }
};

// @desc    Analyze Resume (Text or File)
// @route   POST /api/ai/analyze-resume
// @access  Private
const analyzeResume = async (req, res) => {
    try {
        let resumeText = req.body.resumeText;
        const { jobDescription } = req.body;

        // If a file is uploaded, extract text from it
        if (req.file) {
            const buffer = req.file.buffer;
            const mimetype = req.file.mimetype;

            if (mimetype === 'application/pdf') {
                const data = await pdf(buffer);
                resumeText = data.text;
            } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                const data = await mammoth.extractRawText({ buffer });
                resumeText = data.value;
            } else {
                return res.status(400).json({ message: 'Unsupported file type. Please upload PDF or DOCX.' });
            }
        }

        if (!resumeText || !jobDescription) {
            return res.status(400).json({ message: 'Both resume and job description are required.' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
            Analyze this Resume against the Job Description.
            
            RESUME:
            ${resumeText}
            
            JOB DESCRIPTION:
            ${jobDescription}
            
            Return a JSON object with:
            1. matchScore (number 0-100)
            2. missingKeywords (array of strings)
            3. strengths (array of strings)
            4. improvements (array of strings)
            5. tailoredCoverLetter (string, professional and persuasive)

            IMPORTANT: Return ONLY the raw JSON object. Do not include any markdown formatting or extra text.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the text if it contains markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const analysis = JSON.parse(cleanedText);
            res.json(analysis);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError, 'Raw Text:', text);
            res.status(500).json({ message: 'Failed to parse AI response. Please try again.' });
        }

    } catch (error) {
        console.error('Resume Analysis Error:', error);
        res.status(500).json({ message: 'Error analyzing resume. Check API Key or file format.' });
    }
};

module.exports = { generateQuiz, chatWithTutor, analyzeResume };
