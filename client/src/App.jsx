import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import DailyTasks from './pages/DailyTasks';
import JobHub from './pages/JobHub';
import Landing from './pages/Landing';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
          <Route path="/daily-tasks" element={<PrivateRoute><DailyTasks /></PrivateRoute>} />
          <Route path="/job-hub" element={<PrivateRoute><JobHub /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
