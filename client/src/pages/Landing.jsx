import { Link } from 'react-router-dom';
import { BookOpen, Brain, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Hero Section */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Brain className="w-8 h-8 text-indigo-600" /> AI Learning
                    </h1>
                    <div className="space-x-4">
                        <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Login</Link>
                        <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">Get Started</Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
                        <Sparkles className="w-4 h-4" /> Revolutionizing Education
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Master Any Subject with <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI-Powered Learning</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Experience personalized courses, instant AI-generated quizzes, and a 24/7 intelligent tutor dedicated to your success.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-700 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-2">
                            Start Learning Now <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/login" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md">
                            Log In
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="card group hover:-translate-y-2">
                        <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                            <BookOpen className="text-indigo-600 w-7 h-7 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Curated Courses</h3>
                        <p className="text-gray-600 leading-relaxed">Access a wide range of structured courses tailored to your specific learning needs and goals.</p>
                    </div>
                    <div className="card group hover:-translate-y-2">
                        <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                            <Brain className="text-purple-600 w-7 h-7 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">AI Quizzes</h3>
                        <p className="text-gray-600 leading-relaxed">Test your knowledge with dynamic, adaptive quizzes generated instantly by advanced AI.</p>
                    </div>
                    <div className="card group hover:-translate-y-2">
                        <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                            <MessageCircle className="text-green-600 w-7 h-7 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">24/7 AI Tutor</h3>
                        <p className="text-gray-600 leading-relaxed">Stuck on a concept? Chat with our AI tutor for instant, easy-to-understand explanations anytime.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Landing;
