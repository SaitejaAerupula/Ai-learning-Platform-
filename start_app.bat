@echo off
echo Starting Personalized E-Learning Platform...

:: Start Backend
start "E-Learning Backend" cmd /k "cd server && npm start"

:: Start Frontend
start "E-Learning Frontend" cmd /k "cd client && npm run dev"

echo Application started!
echo Backend running on port 5000
echo Frontend running on http://localhost:5173
