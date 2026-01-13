import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ProgressChart = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ avgScore: 0, totalQuizzes: 0, completion: 0 });

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data: results } = await axios.get('http://localhost:5000/api/quizzes/my-results', config);

                if (results.length > 0) {
                    // Format data for Recharts
                    const formattedData = results.map(res => ({
                        name: new Date(res.date).toLocaleDateString('en-US', { weekday: 'short' }),
                        score: (res.score / res.totalQuestions) * 100,
                        fullDate: new Date(res.date).toLocaleDateString()
                    }));

                    setData(formattedData);

                    // Calculate stats
                    const totalScore = results.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions), 0);
                    const avg = (totalScore / results.length) * 100;

                    setStats({
                        avgScore: avg.toFixed(1),
                        totalQuizzes: results.length,
                        completion: Math.min(100, results.length * 10) // Mock logic for completion
                    });
                } else {
                    // Fallback to empty or mock if no results
                    setData([
                        { name: 'Mon', score: 0 },
                        { name: 'Tue', score: 0 },
                        { name: 'Wed', score: 0 },
                        { name: 'Thu', score: 0 },
                        { name: 'Fri', score: 0 },
                        { name: 'Sat', score: 0 },
                        { name: 'Sun', score: 0 },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchResults();
        }
    }, [user]);

    if (loading) return <div className="h-[300px] flex items-center justify-center">Loading analytics...</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Learning Progress</h3>
                    <p className="text-sm text-gray-500">Your quiz performance over time</p>
                </div>
                <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span> Quiz Score (%)
                    </span>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#4f46e5"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Avg Score</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
                </div>
                <div className="text-center border-l border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Quizzes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalQuizzes}</p>
                </div>
                <div className="text-center border-l border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Course Progress</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completion}%</p>
                </div>
            </div>
        </div>
    );
};

export default ProgressChart;
