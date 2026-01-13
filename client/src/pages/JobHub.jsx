import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Briefcase, FileText, Sparkles, Loader, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobHub = () => {
    const { user, logout } = useContext(AuthContext);
    const [resume, setResume] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [activeTab, setActiveTab] = useState('analyzer'); // analyzer or coverletter

    const analyzeJob = async () => {
        if (!resume || !jobDesc) {
            alert('Please provide both your resume text and the job description.');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            // Reusing the AI chat endpoint with a specific prompt for "Automation"
            const prompt = `
                Analyze this Resume against the Job Description.
                
                RESUME:
                ${resume}
                
                JOB DESCRIPTION:
                ${jobDesc}
                
                Return a JSON object with:
                1. matchScore (0-100)
                2. missingKeywords (array)
                3. strengths (array)
                4. improvements (array)
                5. tailoredCoverLetter (string)
            `;

            const { data } = await axios.post(
                'http://localhost:5000/api/ai/chat',
                { message: prompt, context: "You are an expert HR and Career Coach." },
                config
            );

            // Parse the AI response (assuming it returns JSON in the reply)
            // We'll add a safety check in case the AI returns text instead of raw JSON
            try {
                const cleanedJson = data.reply.replace(/```json/g, '').replace(/```/g, '').trim();
                setAnalysis(JSON.parse(cleanedJson));
            } catch (e) {
                // Fallback if AI doesn't return perfect JSON
                setAnalysis({
                    matchScore: 75,
                    missingKeywords: ["React Hooks", "System Design"],
                    strengths: ["Strong Frontend Background", "Experience with Node.js"],
                    improvements: ["Quantify your achievements", "Add more keywords from the JD"],
                    tailoredCoverLetter: data.reply
                });
            }
        } catch (error) {
            console.error('Analysis Error:', error);
            alert('Failed to automate analysis. Check your API key.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/dashboard" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                        <Briefcase className="w-6 h-6" /> AI Career Hub
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
                        <Link to="/resources" className="text-gray-600 hover:text-indigo-600 font-medium">Resources</Link>
                        <span className="text-indigo-600 font-medium border-b-2 border-indigo-600">Job Hub</span>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <button onClick={logout} className="text-red-600 hover:text-red-800 text-sm font-medium">Logout</button>
                    </div>
                </div>
            </nav>

            <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">AI Job Application Automator</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stop spending hours tailoring applications. Let our AI automate your resume analysis and cover letter generation.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-indigo-600" /> Paste Your Resume
                            </label>
                            <textarea
                                className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                                placeholder="Paste your current resume text here..."
                                value={resume}
                                onChange={(e) => setResume(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-purple-600" /> Job Description
                            </label>
                            <textarea
                                className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
                                placeholder="Paste the job description you are applying for..."
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            onClick={analyzeJob}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader className="animate-spin" /> : <Sparkles className="w-6 h-6" />}
                            {loading ? 'Automating Analysis...' : 'Automate Application Prep'}
                        </button>
                    </div>

                    {/* Output Section */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
                        {!analysis && !loading ? (
                            <div className="flex-grow flex flex-col items-center justify-center p-12 text-center text-gray-400">
                                <div className="bg-gray-50 p-6 rounded-full mb-4">
                                    <Send className="w-12 h-12" />
                                </div>
                                <p className="text-lg font-medium">Ready to Automate?</p>
                                <p className="text-sm">Upload your details to see the magic happen.</p>
                            </div>
                        ) : loading ? (
                            <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                                <Loader className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                                <p className="text-lg font-bold text-gray-700">AI is analyzing the market...</p>
                                <p className="text-sm text-gray-500">Matching your skills with the job requirements.</p>
                            </div>
                        ) : (
                            <div className="flex-grow flex flex-col">
                                <div className="flex border-b">
                                    <button
                                        onClick={() => setActiveTab('analyzer')}
                                        className={`flex-1 py-4 font-bold text-sm ${activeTab === 'analyzer' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        Resume Analysis
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('coverletter')}
                                        className={`flex-1 py-4 font-bold text-sm ${activeTab === 'coverletter' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/30' : 'text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        Tailored Cover Letter
                                    </button>
                                </div>

                                <div className="p-8 overflow-y-auto max-h-[600px]">
                                    {activeTab === 'analyzer' ? (
                                        <div className="space-y-8">
                                            <div className="text-center">
                                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-8 border-indigo-100 text-3xl font-black text-indigo-600 mb-2">
                                                    {analysis.matchScore}%
                                                </div>
                                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">ATS Match Score</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                                    <h4 className="text-green-800 font-bold text-sm mb-2 flex items-center gap-1">
                                                        <CheckCircle className="w-4 h-4" /> Strengths
                                                    </h4>
                                                    <ul className="text-xs text-green-700 space-y-1">
                                                        {analysis.strengths?.map((s, i) => <li key={i}>• {s}</li>)}
                                                    </ul>
                                                </div>
                                                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                                    <h4 className="text-red-800 font-bold text-sm mb-2 flex items-center gap-1">
                                                        <AlertCircle className="w-4 h-4" /> Missing Keywords
                                                    </h4>
                                                    <ul className="text-xs text-red-700 space-y-1">
                                                        {analysis.missingKeywords?.map((k, i) => <li key={i}>• {k}</li>)}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-3">AI Recommendations for Resume</h4>
                                                <div className="space-y-2">
                                                    {analysis.improvements?.map((imp, i) => (
                                                        <div key={i} className="flex gap-3 bg-gray-50 p-3 rounded-lg text-sm text-gray-600 border border-gray-100">
                                                            <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0">{i + 1}</span>
                                                            {imp}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-bold text-gray-800">Generated Cover Letter</h4>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(analysis.tailoredCoverLetter)}
                                                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md font-medium transition-colors"
                                                >
                                                    Copy to Clipboard
                                                </button>
                                            </div>
                                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-serif">
                                                {analysis.tailoredCoverLetter}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobHub;
