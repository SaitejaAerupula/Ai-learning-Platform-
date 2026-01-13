import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ChatBot from '../components/ChatBot';
import ChessGame from '../components/ChessGame';
import SudokuGame from '../components/SudokuGame';
import { Gamepad2, Brain } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [selectedGame, setSelectedGame] = useState(null);

    const games = [
        {
            id: 'chess',
            title: 'Chess Master',
            description: 'Sharpen your strategic thinking with a classic game of Chess. Play against a basic AI.',
            icon: <Gamepad2 className="w-12 h-12 text-indigo-600" />,
            component: <ChessGame />
        },
        {
            id: 'sudoku',
            title: 'Sudoku Challenge',
            description: 'Train your brain with Sudoku. Choose your difficulty and solve the puzzle.',
            icon: <Brain className="w-12 h-12 text-purple-600" />,
            component: <SudokuGame />
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-bold text-indigo-600">AI Learning Dashboard</h1>
                        <div className="hidden md:flex gap-6">
                            <span className="text-indigo-600 font-medium border-b-2 border-indigo-600 cursor-default">Relax Games</span>
                            <a href="/resources" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Resources</a>
                            <a href="/daily-tasks" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Daily Tasks</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
                            <span className="text-lg">🔥</span>
                            <span>{user?.streakCount || 0} Day Streak</span>
                        </div>
                        <span className="text-gray-700 hidden sm:block">Welcome, {user?.name}</span>
                        <button
                            onClick={logout}
                            className="text-red-600 hover:text-red-800 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {selectedGame ? (
                    <div>
                        <button
                            onClick={() => setSelectedGame(null)}
                            className="mb-4 text-indigo-600 hover:underline flex items-center gap-2"
                        >
                            &larr; Back to Games
                        </button>
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-3xl font-bold mb-2 text-center">{selectedGame.title}</h2>
                            <p className="text-gray-600 mb-8 text-center">{selectedGame.description}</p>

                            <div className="flex justify-center">
                                {selectedGame.component}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Relax & Play</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Take a break from learning and stimulate your mind with these classic strategy games.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {games.map((game) => (
                                <div
                                    key={game.id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
                                    onClick={() => setSelectedGame(game)}
                                >
                                    <div className="p-8 flex flex-col items-center text-center">
                                        <div className="bg-gray-50 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                                            {game.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                                        <p className="text-gray-600 mb-6">{game.description}</p>
                                        <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                            Play Now &rarr;
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <ChatBot />
        </div>
    );
};

export default Dashboard;
