# Personalized E-Learning Platform

A MERN stack application for personalized learning with AI-powered quizzes and tutoring.

## Features
- **Course Dashboard**: View available courses.
- **AI Quizzes**: Generate quizzes based on course content using Gemini/OpenAI.
- **AI Tutor**: Chat with an AI assistant for doubts.
- **Progress Tracking**: Track your quiz scores.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB
- **AI**: Google Gemini API / OpenAI API

## Setup
1.  **Server**:
    ```bash
    cd server
    npm install
    npm start
    ```
2.  **Client**:
    ```bash
    cd client
    npm install
    npm run dev
    ```

---

# Personalized E-Learning Platform: A Technical Report

## Abstract
In the rapidly evolving landscape of education technology, personalized learning has emerged as a critical factor in student success. This project presents a "Personalized E-Learning Platform," a web-based application designed to tailor educational experiences to individual users. Built on the MERN stack (MongoDB, Express.js, React, Node.js), the platform integrates advanced Artificial Intelligence (AI) capabilities using Google Gemini/OpenAI APIs. Key features include dynamic course dashboards, AI-generated quizzes that adapt to course content, an interactive AI tutor for real-time doubt resolution, and comprehensive progress tracking. This paper details the system architecture, implementation methodology, and the potential impact of AI-driven personalization in e-learning.

## 1. Introduction
Traditional e-learning platforms often suffer from a "one-size-fits-all" approach, leading to lower engagement and retention rates. Students have varying learning speeds and styles, necessitating a more adaptive solution. The Personalized E-Learning Platform addresses this gap by leveraging modern web technologies and Generative AI. The primary objective is to create an intelligent environment where learners can access curated content, test their knowledge through generated assessments, and receive instant support from a virtual tutor, thereby democratizing access to high-quality, personalized education.

## 2. System Architecture
The application follows a robust Client-Server architecture, utilizing the MERN stack for full-stack development.

### 2.1 Frontend
- **Framework**: React.js (with Vite for build optimization).
- **Styling**: Tailwind CSS for responsive and modern UI design.
- **State Management**: React Context API for managing user authentication and application state.
- **Routing**: React Router for seamless navigation between modules (Dashboard, Tasks, Resources).

### 2.2 Backend
- **Runtime**: Node.js.
- **Framework**: Express.js for handling RESTful API requests.
- **Database**: MongoDB for storing user profiles, course data, and progress logs.
- **Authentication**: JWT (JSON Web Tokens) for secure user sessions.

### 2.3 AI Integration
- **Service**: Google Gemini API / OpenAI API.
- **Functionality**: The backend acts as a proxy to the AI services, handling prompt engineering to generate relevant quiz questions based on course material and providing context-aware answers in the AI Tutor chat interface.

## 3. Key Features

### 3.1 User Authentication
Secure registration and login functionality allow users to create personalized accounts. User data is encrypted and securely stored, ensuring privacy and data integrity.

### 3.2 Interactive Dashboard
Upon logging in, users are greeted with a comprehensive dashboard displaying available courses, current progress, and quick access to daily learning tasks.

### 3.3 AI-Powered Quizzes
Unlike static question banks, the platform generates quizzes dynamically. The system analyzes course content and prompts the AI model to create unique questions, ensuring that assessments remain challenging and relevant. Results are stored in the database to track student progress over time.

### 3.4 AI Tutor
A dedicated chat interface allows users to ask questions related to their studies. The AI Tutor provides instant, accurate explanations, acting as a 24/7 study companion.

### 3.5 Real-time Analytics Dashboard
The platform features a sophisticated analytics dashboard using **Recharts**. It visualizes student performance trends, average scores, and learning consistency. This data-driven approach helps students identify their strengths and weaknesses.

### 3.6 AI-Driven Recommendations
Based on quiz performance, the system provides intelligent recommendations. If a student struggles with a specific topic, the AI suggests targeted practice quizzes to bridge the knowledge gap.

### 3.7 Resource Management & Daily Tasks
Users can access a library of learning resources and track their daily learning goals (`DailyTasks`), promoting consistent study habits.

## 4. Methodology
The development process followed an agile methodology:
1.  **Requirement Analysis**: Identifying the need for personalization in e-learning.
2.  **Database Design**: Schema design for `Users` and `Courses` in MongoDB.
3.  **API Development**: Creating REST endpoints for auth, courses, and AI interaction.
4.  **Frontend Implementation**: Building responsive React components for the UI.
5.  **AI Integration**: Implementing the logic to send prompts to the AI API and parse responses for the frontend.
6.  **Testing**: Unit and integration testing to ensure system reliability.

## 5. Conclusion and Future Scope
The Personalized E-Learning Platform demonstrates the power of combining traditional web development with modern AI capabilities. By providing tailored content and instant support, it significantly enhances the learning experience. Future enhancements may include:
- **Voice Interaction**: Enabling voice-based queries with the AI Tutor.
- **Peer Learning**: Adding community features for student interaction.
- **Advanced Analytics**: Using machine learning to predict student performance and suggest interventions.

## 6. References
1.  MongoDB Documentation: https://www.mongodb.com/docs/
2.  React Documentation: https://react.dev/
3.  Express.js Guide: https://expressjs.com/
4.  Google Gemini API: https://ai.google.dev/
