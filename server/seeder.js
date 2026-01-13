const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const courses = [
    {
        title: 'Introduction to Python Programming',
        description: 'Learn the basics of Python, one of the most popular programming languages.',
        category: 'Programming',
        content: `
# Introduction to Python

Python is a high-level, interpreted programming language known for its readability and versatility.

## Key Concepts
1. **Variables**: Containers for storing data values.
2. **Data Types**: Integers, Floats, Strings, Booleans.
3. **Control Flow**: if/else statements, for/while loops.
4. **Functions**: Reusable blocks of code.

## Example Code
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`

Python is widely used in Web Development, Data Science, AI, and Automation.
    `
    },
    {
        title: 'Web Development Fundamentals',
        description: 'Master HTML, CSS, and JavaScript to build modern websites.',
        category: 'Web Dev',
        content: `
# Web Development Fundamentals

Web development is the work involved in developing a website for the Internet.

## Core Technologies
1. **HTML (HyperText Markup Language)**: The structure of the web page.
2. **CSS (Cascading Style Sheets)**: The styling and layout.
3. **JavaScript**: The interactivity and logic.

## The DOM
The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.
    `
    },
    {
        title: 'Machine Learning Basics',
        description: 'Understand the core concepts of ML and how machines learn from data.',
        category: 'AI/ML',
        content: `
# Machine Learning Basics

Machine Learning (ML) is a subset of artificial intelligence (AI) that focuses on building systems that learn from data.

## Types of Learning
1. **Supervised Learning**: Learning from labeled data (e.g., Spam detection).
2. **Unsupervised Learning**: Finding patterns in unlabeled data (e.g., Customer segmentation).
3. **Reinforcement Learning**: Learning through trial and error (e.g., Game playing AI).

## Common Algorithms
- Linear Regression
- Decision Trees
- Neural Networks
    `
    }
];

const importData = async () => {
    try {
        await Course.deleteMany();

        await Course.insertMany(courses);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
