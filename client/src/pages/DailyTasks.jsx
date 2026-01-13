import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Globe, Linkedin, BookOpen, Briefcase, ExternalLink } from 'lucide-react';

const DailyTasks = () => {
    const { user, logout } = useContext(AuthContext);

    const tasks = [
        {
            id: 'duolingo',
            name: 'Duolingo',
            url: 'https://www.duolingo.com',
            description: 'Learn a new language for free. Gamified learning to keep you motivated.',
            icon: <Globe className="w-8 h-8 text-green-500" />,
            color: 'bg-green-100',
            btnColor: 'text-green-600'
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            url: 'https://www.linkedin.com',
            description: 'Network with professionals, find jobs, and build your career profile.',
            icon: <Linkedin className="w-8 h-8 text-blue-600" />,
            color: 'bg-blue-100',
            btnColor: 'text-blue-600'
        },
        {
            id: 'indiabix',
            name: 'IndiaBIX',
            url: 'https://www.indiabix.com',
            description: 'Aptitude questions and answers for interview preparation.',
            icon: <BookOpen className="w-8 h-8 text-teal-600" />,
            color: 'bg-teal-100',
            btnColor: 'text-teal-600'
        },
        {
            id: 'placement',
            name: 'Preparation',
            url: 'https://placementdrive.in',
            description: 'Latest off-campus drives, internships, and placement papers.',
            icon: <Briefcase className="w-8 h-8 text-orange-600" />,
            color: 'bg-orange-100',
            btnColor: 'text-orange-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/dashboard" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                        AI Learning
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
                        <Link to="/resources" className="text-gray-600 hover:text-indigo-600 font-medium">Resources</Link>
                        <span className="text-indigo-600 font-medium border-b-2 border-indigo-600">Daily Tasks</span>
                        <Link to="/job-hub" className="text-gray-600 hover:text-indigo-600 font-medium">Job Hub</Link>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
                            <span className="text-lg">🔥</span>
                            <span>{user?.streakCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <button onClick={logout} className="text-red-600 hover:text-red-800 text-sm font-medium">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Daily Tasks</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay on top of your career and skill development. Visit these platforms daily to ensure consistent growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {tasks.map((task) => (
                        <div key={task.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col sm:flex-row">
                            <div className={`p-6 flex items-center justify-center sm:w-32 ${task.color}`}>
                                {task.icon}
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">{task.name}</h3>
                                    <p className="text-gray-600 mb-4">{task.description}</p>
                                </div>
                                <a
                                    href={task.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-2 font-bold hover:underline ${task.btnColor}`}
                                >
                                    Go to {task.name} <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-600 font-medium">
                        &copy; {new Date().getFullYear()} AI Learning Platform. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default DailyTasks;
