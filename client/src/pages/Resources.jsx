import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { ExternalLink, Bell, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
    const { user, logout } = useContext(AuthContext);
    const [notifications, setNotifications] = useState({
        w3schools: true,
        geeksforgeeks: true,
        takeuforward: true,
    });

    const toggleNotification = (platform) => {
        setNotifications(prev => ({
            ...prev,
            [platform]: !prev[platform]
        }));
    };

    const resources = [
        {
            id: 'w3schools',
            name: 'W3Schools',
            url: 'https://www.w3schools.com',
            description: 'The world\'s largest web developer site.',
            color: 'bg-green-100 text-green-800',
            iconColor: 'text-green-600'
        },
        {
            id: 'geeksforgeeks',
            name: 'GeeksforGeeks',
            url: 'https://www.geeksforgeeks.org',
            description: 'A computer science portal for geeks.',
            color: 'bg-green-100 text-green-800', // GFG is also green-ish
            iconColor: 'text-green-600'
        },
        {
            id: 'takeuforward',
            name: 'takeUforward',
            url: 'https://takeuforward.org',
            description: 'Best resource for DSA and Interview Prep.',
            color: 'bg-red-100 text-red-800',
            iconColor: 'text-red-600'
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
                        <span className="text-indigo-600 font-medium border-b-2 border-indigo-600">Resources</span>
                        <Link to="/daily-tasks" className="text-gray-600 hover:text-indigo-600 font-medium">Daily Tasks</Link>
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Learning Resources</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Access your favorite learning platforms directly from here. Enable notifications to stay consistent with your daily practice.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {resources.map((resource) => (
                        <div key={resource.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                            <div className="p-8">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${resource.color}`}>
                                    <ExternalLink className={`w-7 h-7 ${resource.iconColor}`} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">{resource.name}</h3>
                                <p className="text-gray-600 mb-8 h-12">{resource.description}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                                    >
                                        Visit Website <ExternalLink className="w-4 h-4" />
                                    </a>

                                    <button
                                        onClick={() => toggleNotification(resource.id)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${notifications[resource.id]
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                            }`}
                                    >
                                        {notifications[resource.id] ? (
                                            <>
                                                <CheckCircle className="w-4 h-4" /> Daily Active
                                            </>
                                        ) : (
                                            <>
                                                <Bell className="w-4 h-4" /> Notify Me
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className={`h-1.5 w-full ${notifications[resource.id] ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-indigo-900 rounded-2xl p-8 text-white text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">Stay Consistent!</h3>
                        <p className="text-indigo-200 mb-6 max-w-xl mx-auto">
                            "Consistency is what transforms average into excellence." <br />
                            Make sure to visit at least one of these platforms every day to keep your streak alive.
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
                            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                            <span>You are currently logged in as <span className="font-bold">{user?.email}</span></span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-600 font-medium">
                        &copy; {new Date().getFullYear()} AI Learning Platform. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        Designed for Semester Project
                    </p>
                </div>
            </footer>
        </div >
    );
};

export default Resources;
